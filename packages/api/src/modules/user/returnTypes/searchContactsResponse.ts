import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/User";

@ObjectType()
export class SearchContactsResponse extends User {
  @Field(() => String, { nullable: true })
  conversationId: string;
}
