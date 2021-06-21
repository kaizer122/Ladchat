import { prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class BaseEntity {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => Float)
  @Property({ default: Date.now, index: true })
  createdAt: number;
}
