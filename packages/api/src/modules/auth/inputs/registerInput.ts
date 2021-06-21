import { Field, InputType } from "type-graphql";
import { object, string } from "yup";

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  avatarUrl: string;

  static schema = object().shape({
    email: string().email("Invalid email").required(),
    password: string().min(6).max(20).required(),
    firstName: string()
      .label("First name")
      .matches(/^[A-Za-z ]*$/, "First name can't contain special characters")
      .min(1)
      .max(40)
      .required(),
    lastName: string()
      .label("Last name")
      .matches(/^[A-Za-z ]*$/, "Last Name can't contain special characters")
      .min(1)
      .max(40)
      .required(),
    avatarUrl: string().label("Avatar").url().required(),
  });
}
