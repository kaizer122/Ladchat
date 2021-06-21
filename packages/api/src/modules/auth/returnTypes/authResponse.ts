import { Field, ObjectType } from "type-graphql";
import { User } from "../../user/entities/User";

@ObjectType()
export class AuthResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
