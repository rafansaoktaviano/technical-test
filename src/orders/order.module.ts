import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.entity';
import { OrderService } from './application/order.service';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderItem } from '../order-items/domain/order-items.entity';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
})
export class OrdersModule {}
