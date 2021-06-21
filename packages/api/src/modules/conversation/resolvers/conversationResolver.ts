import { ObjectId } from "mongodb";
import { FilterQuery } from "mongoose";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { RequireAuth } from "../../../middlewares";
import { ConvUpdatedSubPayload } from "../../../types/convUpdatedSubPayload";
import { IAuthedContext } from "../../../types/myContext";
import { Topic } from "../../../types/topics";
import { logWarning } from "../../../utils/logger";
import { getSearchStringQuery } from "../../../utils/queryFunctions";
import { toObjectId } from "../../../utils/toObjectId";
import { PaginationInput } from "../../common/inputs/paginationInput";
import { User } from "../../user/entities/User";
import { Conversation, ConversationModel } from "../entities/conversation";
import { Message, MessageModel } from "../entities/message";
import { MessageResponse } from "../returnTypes/messageResponse";
@Resolver(() => Conversation)
export class ConversationResolver {
  @Query(() => [Conversation])
  @RequireAuth()
  async conversations(
    @Arg("pagination")
    { skip, limit }: PaginationInput,
    @Arg("search", () => String, { nullable: true }) search: string,
    @Ctx() ctx: IAuthedContext
  ) {
    let query: FilterQuery<Conversation> = {
      participants: { $in: [ctx.userId!] },
    };
    if (search && search.trim().length > 0)
      query = getSearchStringQuery<any>(
        [
          "participants.firstName",
          "participants.lastName",
          "participants.email",
        ],
        search,
        query
      );
    return await ConversationModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .populate("participants")
      .lean();
  }

  @Mutation(() => Conversation)
  @RequireAuth()
  async markConversationSeen(
    @Arg("conversationId")
    conversationId: string,
    @Ctx() ctx: IAuthedContext
  ) {
    const res = await MessageModel.updateMany(
      {
        conversationId: conversationId,
        sender: { $ne: ctx.userId },
        seen: false,
      },
      { seen: true },
      { multi: true }
    );
    logWarning("===>", res);
    logWarning("===>", {
      conversationId: conversationId,
      receiver: ctx.userId,
      seen: false,
    });

    return await ConversationModel.findById(conversationId).lean();
  }

  @Subscription(() => Conversation, {
    topics: Topic.CONVERSATION_UPDATED,
    filter: ({
      payload,
      context,
    }: ResolverFilterData<ConvUpdatedSubPayload, any, IAuthedContext>) => {
      const isReceiver = payload.conversation.participants.some((p) =>
        toObjectId(p).equals(context.userId)
      );
      return isReceiver;
    },
  })
  conversationUpdated(@Root() payload: ConvUpdatedSubPayload): Conversation {
    return payload.conversation;
  }

  @FieldResolver(() => [Message])
  async messages(
    @Root() conversation: Conversation,
    @Arg("pagination", { defaultValue: { skip: 0, limit: 1 } })
    { skip, limit }: PaginationInput
  ) {
    if (!conversation.messages || conversation.messages.length <= 0) return [];
    else
      return await MessageModel.find({
        _id: { $in: conversation.messages as ObjectId[] },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .then((messages) => messages.sort((a, b) => b.createdAt - a.createdAt));
  }

  @FieldResolver(() => [User])
  async participants(
    @Root() conversation: Conversation,
    @Ctx() ctx: IAuthedContext
  ) {
    if (!conversation.participants || conversation.participants.length <= 0)
      return [];
    else {
      const ids = conversation.participants
        .filter((p) => !ctx.userId.equals(toObjectId(p)))
        .map((p) => toObjectId(p).toHexString());
      return ctx.loaders.userLoader.loadMany(ids);
    }
  }

  @FieldResolver(() => MessageResponse)
  async lastMessage(@Root() conversation: Conversation) {
    return await MessageModel.findOne({
      conversationId: conversation._id as any,
    })
      .sort({ createdAt: -1 })
      .lean();
  }
}
