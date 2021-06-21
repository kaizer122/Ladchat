import {
  Arg,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { RequireAuth } from "../../../middlewares";
import { IAuthedContext } from "../../../types/myContext";
import { NotificationPayload } from "../../../types/notificationPayload";
import { Topic } from "../../../types/topics";
import { toObjectId } from "../../../utils/toObjectId";
import { UserModel } from "../../user/entities/User";

@Resolver()
export class NotificationResolver {
  @Mutation(() => Boolean)
  @RequireAuth()
  async testSubscriptions(
    @Ctx()
    ctx: IAuthedContext,
    @Arg("userId")
    id: string,
    @PubSub(Topic.NOTIFICATIONS) notifySender: Publisher<NotificationPayload>
  ) {
    const user = await UserModel.findById(ctx.userId);
    notifySender({
      message: `${user?.fullName()} sends his regards!`,
      receiverId: toObjectId(id),
    });
    return true;
  }
  @Subscription(() => String, {
    topics: Topic.NOTIFICATIONS,
    filter: ({
      payload,
      context,
    }: ResolverFilterData<NotificationPayload, unknown, IAuthedContext>) => {
      return context.userId.equals(payload.receiverId);
    },
  })
  notifications(@Root() payload: NotificationPayload): string {
    return payload.message;
  }
}
