import jwt from "jsonwebtoken";
import { UserModel } from "../../../modules/user/entities/User";
import { userLoader } from "../../../modules/user/loaders/userLoader";
import { JWTPayload } from "../../../types/jwtPayload";
import ExpectedError from "../../../utils/expectedError";
import { logError, logInfo } from "../../../utils/logger";
import { toObjectId } from "../../../utils/toObjectId";

const APP_SECRET = process.env.SESSION_SECRET || "aslkdfjoiq12312";

interface OnConnectParams {
  authToken?: string;
}
const onConnect = async (params: OnConnectParams) => {
  try {
    if (!params.authToken) throw new ExpectedError("Please sign in again");
    const token = params.authToken.replace("Bearer ", "");
    const payload = jwt.verify(token, APP_SECRET) as JWTPayload;
    const isUser = await UserModel.exists({ _id: payload.userId });
    if (!isUser) return new ExpectedError("Please sign in again");

    await UserModel.findByIdAndUpdate(payload.userId, {
      lastSeen: Date.now(),
      isOnline: true,
    });

    logInfo(`connected to ws: ${payload.userId}`);
    return {
      userId: toObjectId(payload.userId),
      isAuthed: true,
      bearerToken: params.authToken,
      loaders: {
        userLoader: userLoader(),
      },
    };
  } catch (e) {
    logError(e);
    logError("User Failed to connect to ws", params);
    return new ExpectedError("Please sign in again");
  }
};
export default onConnect;
