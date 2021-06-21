import { capitalize } from "@ladchat/shared";
import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, Float, ObjectType } from "type-graphql";
import { BaseEntity } from "../../common/entities/BaseEntity";

@ObjectType()
export class User extends BaseEntity {
  @Field(() => String)
  @Property({
    required: true,
    index: true,
    get: (firstName: string) => firstName,
    set: capitalize,
  })
  firstName: string;

  @Field(() => String)
  @Property({
    required: true,
    index: true,
    get: (lastName: string) => lastName,
    set: capitalize,
  })
  lastName: string;

  @Field(() => String)
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Field(() => String)
  @Property({
    required: true,
    unique: true,
    get: (email: string) => email,
    set: (email: string) => email.toLowerCase(),
    index: true,
  })
  email: string;

  @Property({ required: true })
  password: string;

  @Field()
  @Property({ required: true })
  avatarUrl: string;

  @Field()
  @Property({ default: false })
  isOnline: boolean;

  @Field(() => Float)
  @Property({ default: Date.now })
  lastSeen: number;
}

export const UserModel = getModelForClass(User);
