import { MiddlewareFn } from "type-graphql";
import ExpectedError from "../../utils/expectedError";

export const AsyncErrorHandler: MiddlewareFn = async (_, next) => {
  try {
    const result = await next();
    return result;
  } catch (e) {
    if (e instanceof ExpectedError) throw new ExpectedError(e.message);
    else throw new Error(e.message);
  }
};
