import { object, string } from "yup";

const signinValidation = object().shape({
  email: string().email().required(),
  password: string().min(6).max(20).required(),
});

export default signinValidation;
