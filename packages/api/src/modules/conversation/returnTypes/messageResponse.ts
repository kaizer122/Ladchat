import { Field, ObjectType } from "type-graphql";
import { Message } from "../entities/message";

@ObjectType()
export class MessageResponse extends Message {
  @Field(() => Boolean)
  isSender: boolean;
}
