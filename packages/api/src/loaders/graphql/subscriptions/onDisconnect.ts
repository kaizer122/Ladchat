import { ConnectionContext } from "subscriptions-transport-ws";
import type WebSocket from "ws";
import { UserModel } from "../../../modules/user/entities/User";
import { logError } from "../../../utils/logger";
const onDisconnect = async (_: WebSocket, context: ConnectionContext) => {
  const initialContext = await context.initPromise;
  if (
    initialContext &&
    typeof initialContext === "object" &&
    Reflect.has(initialContext, "userId")
  ) {
    const { userId } = initialContext;
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        lastSeen: Date.now(),
        isOnline: false,
      }
    ).catch((e) => logError(e));
  }
};
export default onDisconnect;
