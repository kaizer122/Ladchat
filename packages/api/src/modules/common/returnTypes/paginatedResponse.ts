import { ClassType, Field, Int, ObjectType } from "type-graphql";

export default function PaginatedResponse<TItemsFieldValue>(
  itemsFieldValue: ClassType<TItemsFieldValue> | string | number | boolean,
  itemName: string
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [itemsFieldValue], { name: `${itemName}s` })
    items: TItemsFieldValue[];

    @Field(() => Int)
    count: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}
