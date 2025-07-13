import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
  @Field()
  product_id: string;
  @Field()
  quantity: number;
  @Field()
  price: number;
}
