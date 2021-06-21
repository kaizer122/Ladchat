import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, Float, ObjectType } from "type-graphql";
import { Ref } from "../../../types/ref";
import { BaseEntity } from "../../common/entities/BaseEntity";
import { User } from "../../user/entities/User";
import { MessageResponse } from "../returnTypes/messageResponse";
import { Message } from "./message";

@ObjectType()
export class Conversation extends BaseEntity {
  @Field(() => [User])
  @Property({ ref: User, required: true, index: true })
  participants: Ref<User>[];

  @Field(() => [MessageResponse])
  @Property({ ref: Message, default: [] })
  messages: Ref<Message>[];

  @Field(() => Float)
  @Property({ default: Date.now, index: true })
  updatedAt: number;
}

export const ConversationModel = getModelForClass(Conversation);
