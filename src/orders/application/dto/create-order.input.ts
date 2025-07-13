import { Field, InputType } from '@nestjs/graphql';
import { OrderItemInput } from '../../../order-items/application/dto/order-item.input';

@InputType()
export class CreateOrderInput {
  @Field()
  user_id: string;

  @Field()
  total_price: number;

  @Field(() => [OrderItemInput])
  order_items: OrderItemInput[];
}
