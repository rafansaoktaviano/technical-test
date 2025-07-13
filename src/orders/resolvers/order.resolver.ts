import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderService } from '../application/order.service';
import { Order, OrderStatus } from '../domain/order.entity';
import { CreateOrderInput } from '../application/dto/create-order.input';
import { OrderItem } from '../../order-items/domain/order-items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  @Mutation(() => Order, { name: 'createOrder' })
  createOrder(@Args('order') input: CreateOrderInput): Promise<Order | null> {
    const order = new Order();

    order.user_id = input.user_id;
    order.status = 'PENDING' as OrderStatus;
    order.total_price = 20000;

    const orderItems = input.order_items.map((itemInput) => {
      const orderItem = new OrderItem();
      orderItem.product_id = itemInput.product_id;
      orderItem.quantity = itemInput.quantity;
      orderItem.price = itemInput.price;
      return orderItem;
    });

    order.order_items = orderItems;

    return this.orderService.createOrder(order);
  }
}
