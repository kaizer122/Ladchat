import { Field, InputType } from "type-graphql";
import { object, string } from "yup";

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;

  static schema = object().shape({
    email: string().email("Invalid email").required(),
    password: string().min(6).max(20).required(),
  });
}
