import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './domain/order-items.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemsModule {}
