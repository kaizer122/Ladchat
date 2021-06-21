import { object, ref, string } from "yup";

const registerValidation = (isFirstStep: boolean) => {
  const shape: any = {
    email: string().email("Invalid email").required("Email is required."),
    password: string()
      .label("Password")
      .min(6)
      .max(20)
      .required("Password is required."),
    confPassword: string().oneOf(
      [ref("password"), null],
      "Passwords must match."
    ),
    firstName: string()
      .label("First Name")
      .matches(/^[A-Za-z ]*$/, "First Name can't contain special characters.")
      .min(1)
      .max(40)
      .required("First Name is required."),
    lastName: string()
      .label("Last Name")
      .matches(/^[A-Za-z ]*$/, "Last Name can't contain special characters.")
      .min(1)
      .max(40)
      .required(),
  };
  if (!isFirstStep) shape.avatarUrl = string().label("Avatar").url().required();
  return object().shape(shape);
};
export default registerValidation;
