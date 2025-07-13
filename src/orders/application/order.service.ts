import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../domain/order.entity';
import { OrderItem } from '../../order-items/domain/order-items.entity';

export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(order: Order): Promise<Order | null> {
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = order.order_items.map((product) => {
      const orderItem = new OrderItem();
      orderItem.order_id = savedOrder.id;
      orderItem.product_id = product.product_id;
      orderItem.quantity = product.quantity;
      orderItem.price = product.price;
      return orderItem;
    });

    await this.orderItemRepository.save(orderItems);

    return this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['order_items', 'order_items.product', 'user'],
    });
  }
}
