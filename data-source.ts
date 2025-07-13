// data-source.ts
import { DataSource } from 'typeorm';
import { User } from './src/users/domain/user.entity';
import { Product } from './src/catalog/domain/product.entity';
import { Order } from './src/orders/domain/order.entity';
import { OrderItem } from './src/order-items/domain/order-items.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '91378531',
  database: 'ecommerce-microservices',
  synchronize: false,
  entities: [User, Product, Order, OrderItem],
  migrations: ['src/migrations/*.ts'],
});
