import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 0 })
  skip: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
