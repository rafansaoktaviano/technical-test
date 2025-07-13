import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProductFilterInput {
  @Field({ nullable: true })
  keyword?: string;
}
