import { createMethodDecorator } from "type-graphql";
import { AnySchema, ValidationError } from "yup";
import ExpectedError from "../../utils/expectedError";

export const ValidateArg = (schema: AnySchema, inputName: string) => {
  return createMethodDecorator(async ({ args }, next) => {
    await schema.validate(args[inputName]).catch((err: ValidationError) => {
      throw new ExpectedError(err.message);
    });

    return next();
  });
};
