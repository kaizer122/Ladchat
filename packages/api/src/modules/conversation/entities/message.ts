import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Ref } from "../../../types/ref";
import { BaseEntity } from "../../common/entities/BaseEntity";
import { User } from "../../user/entities/User";

@ObjectType()
export class Message extends BaseEntity {
  @Field(() => String)
  @Property({
    required: true,
    index: true,
  })
  message: string;

  @Field(() => User)
  @Property({
    ref: User,
    required: true,
    index: true,
  })
  sender: Ref<User>;

  @Field(() => Boolean)
  @Property({
    required: true,
    index: true,
    default: false,
  })
  seen: boolean;

  @Field(() => ID)
  @Property({
    required: true,
    index: true,
  })
  conversationId: string;
}

export const MessageModel = getModelForClass(Message);
