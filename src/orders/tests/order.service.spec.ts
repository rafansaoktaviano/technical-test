import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../application/order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order, OrderStatus } from '../domain/order.entity';
import { OrderItem } from '../../order-items/domain/order-items.entity';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepoMock;
  let orderItemRepoMock;

  beforeEach(async () => {
    orderRepoMock = {
      save: jest.fn(),
      findOne: jest.fn(),
    };
    orderItemRepoMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: orderRepoMock,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useValue: orderItemRepoMock,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order with order items', async () => {
    const order = new Order();
    order.status = 'PENDING' as OrderStatus;
    order.total_price = 20000;
    order.user_id = 'user-1234';

    // Mock order_items array on order
    order.order_items = [
      {
        product_id: 'product-1234',
        quantity: 2,
        price: 10000,
      },
      {
        product_id: 'product-5678',
        quantity: 1,
        price: 20000,
      },
    ] as any; // cast as any to avoid type errors for test

    // Mock saving order returns the order with id
    orderRepoMock.save.mockImplementation(async (entity: Order) => ({
      ...entity,
      id: 'order-1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Mock saving order items returns them
    orderItemRepoMock.save.mockImplementation(async (entities) => entities);

    // Mock findOne to return saved order + order_items
    orderRepoMock.findOne.mockResolvedValue({
      ...order,
      id: 'order-1234',
      order_items: order.order_items,
    });

    const result = await service.createOrder(order);

    expect(orderRepoMock.save).toHaveBeenCalledWith(order);
    expect(orderItemRepoMock.save).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          order_id: 'order-1234',
          product_id: 'product-1234',
          quantity: 2,
          price: 10000,
        }),
        expect.objectContaining({
          order_id: 'order-1234',
          product_id: 'product-5678',
          quantity: 1,
          price: 20000,
        }),
      ]),
    );


    expect(result).toBeDefined();
    expect(result?.id).toBe('order-1234');
    expect(result?.order_items.length).toBe(2);
  });
});
