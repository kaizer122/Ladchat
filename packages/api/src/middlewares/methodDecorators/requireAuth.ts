import jwt from "jsonwebtoken";
import { createMethodDecorator } from "type-graphql";
import { JWTPayload } from "../../types/jwtPayload";
import { IContext } from "../../types/myContext";
import ExpectedError from "../../utils/expectedError";
import { toObjectId } from "../../utils/toObjectId";
const APP_SECRET = process.env.SESSION_SECRET || "aslkdfjoiq12312";

export const RequireAuth = () => {
  return createMethodDecorator(
    async ({ context: ctx }: { context: IContext }, next) => {
      try {
        const token = ctx.bearerToken?.replace("Bearer ", "") || "";
        const payload = jwt.verify(token, APP_SECRET) as JWTPayload;
        ctx.userId = toObjectId(payload.userId);
        ctx.isAuthed = true;
        return next();
      } catch (_) {
        return new ExpectedError("Please sign in to perform this action");
      }
    }
  );
};
