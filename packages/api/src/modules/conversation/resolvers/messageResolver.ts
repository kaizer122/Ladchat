import { ObjectId } from "mongodb";
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { RequireAuth, ValidateArg } from "../../../middlewares";
import { ConvUpdatedSubPayload } from "../../../types/convUpdatedSubPayload";
import { IAuthedContext } from "../../../types/myContext";
import { NewMsgSubPayload } from "../../../types/newMsgSubPayload";
import { Topic } from "../../../types/topics";
import ExpectedError from "../../../utils/expectedError";
import { logWarning } from "../../../utils/logger";
import { toObjectId } from "../../../utils/toObjectId";
import { User } from "../../user/entities/User";
import { Conversation, ConversationModel } from "../entities/conversation";
import { Message, MessageModel } from "../entities/message";
import NewMsgSubArgs from "../inputs/newMsgSubArgs";
import { SendMessageInput } from "../inputs/sendMessageInput";
import { MessageResponse } from "../returnTypes/messageResponse";
@Resolver(() => MessageResponse)
export class MessageResolver {
  @Query(() => Conversation)
  @RequireAuth()
  async getMessagesByConv(
    @Arg("conversationId") conversationId: string,
    @Ctx() ctx: IAuthedContext
  ) {
    const conversation = await ConversationModel.findById(
      conversationId
    ).lean();
    if (!conversation) return new ExpectedError("Conversation not found");
    if (
      !conversation.participants.some((v) => ctx.userId.equals(v as ObjectId))
    )
      return new ExpectedError("You are not part of this conversation");

    return conversation;
  }

  @Mutation(() => MessageResponse)
  @ValidateArg(SendMessageInput.schema, "input")
  @RequireAuth()
  async sendMessage(
    @Arg("input") { message, conversationId, receiverId }: SendMessageInput,
    @PubSub(Topic.NEW_MESSAGE) notifyRecipient: Publisher<NewMsgSubPayload>,
    @PubSub(Topic.CONVERSATION_UPDATED)
    notifyConvUpdate: Publisher<ConvUpdatedSubPayload>,

    @Ctx() ctx: IAuthedContext
  ) {
    if (conversationId) {
      return await updateConversation({
        conversationId,
        senderId: ctx.userId,
        message,
        notifyRecipient,
        notifyConvUpdate: notifyConvUpdate,
      });
    } else {
      return await upsertConversation({
        receiverId: toObjectId(receiverId!),
        senderId: ctx.userId,
        message,
        notifyRecipient,
        notifyConvUpdate: notifyConvUpdate,
      });
    }
  }

  @Subscription(() => MessageResponse, {
    topics: Topic.NEW_MESSAGE,
    filter: ({
      payload,
      context,
      args,
    }: ResolverFilterData<NewMsgSubPayload, NewMsgSubArgs, IAuthedContext>) => {
      const isReceiver = context.userId.equals(payload.receiverId);
      const isConversationActive = args.conversationId
        ? payload.conversationId === args.conversationId
        : false;

      return isReceiver && isConversationActive;
    },
  })
  async newMessage(
    @Root() payload: NewMsgSubPayload,
    @Args() _: NewMsgSubArgs
  ): Promise<Message> {
    logWarning("type", typeof payload.message.sender);
    return payload.message;
  }

  @FieldResolver(() => Boolean)
  isSender(@Root() message: Message, @Ctx() { userId }: IAuthedContext) {
    const senderId =
      message.sender instanceof Object
        ? (message.sender as User)._id
        : message.sender;

    return userId.equals(senderId!);
  }

  @FieldResolver(() => User)
  async sender(@Root() message: Message, @Ctx() ctx: IAuthedContext) {
    return ctx.loaders.userLoader.load(
      message.sender instanceof ObjectId
        ? message.sender.toHexString()
        : //@ts-ignore
          (message.sender as string)
    );
  }
}

async function updateConversation({
  conversationId,
  senderId,
  message,
  notifyRecipient,
  notifyConvUpdate,
}: {
  conversationId: string;
  senderId: ObjectId;
  message: string;
  notifyRecipient: Publisher<NewMsgSubPayload>;
  notifyConvUpdate: Publisher<ConvUpdatedSubPayload>;
}) {
  const conversation = await ConversationModel.findById(conversationId).lean();
  if (!conversation) throw new ExpectedError("Conversation not found");

  const messageId = new ObjectId();
  await Promise.all([
    new MessageModel({
      _id: messageId,
      sender: senderId,
      message,
      conversationId,
    }).save(),
    ConversationModel.updateOne(
      { _id: conversationId },
      { $push: { messages: messageId }, updatedAt: Date.now() }
    ),
  ]);

  const createdMsg = await MessageModel.findById(messageId).lean();

  const receiverId = conversation.participants.find(
    (p) => !toObjectId(p).equals(senderId)
  );

  if (createdMsg && receiverId) {
    await notifyRecipient({
      conversationId,
      message: createdMsg,
      receiverId: toObjectId(receiverId).toHexString(),
    });
  }
  await notifyConvUpdate({ conversation });

  return createdMsg;
}

async function upsertConversation({
  receiverId,
  senderId,
  message,
  notifyRecipient,
  notifyConvUpdate,
}: {
  receiverId: ObjectId;
  senderId: ObjectId;
  message: string;
  notifyRecipient: Publisher<NewMsgSubPayload>;
  notifyConvUpdate: Publisher<ConvUpdatedSubPayload>;
}) {
  const messageId = new ObjectId();
  const conversationId = new ObjectId();

  await Promise.all([
    new MessageModel({
      _id: messageId,
      sender: senderId,
      message,
      conversationId,
    }).save(),
    new ConversationModel({
      _id: conversationId,
      participants: [senderId, receiverId],
      messages: [messageId],
    }).save(),
  ]);

  const createdMsg = await MessageModel.findById(messageId).lean();
  const createdConv = await ConversationModel.findById(conversationId).lean();
  if (createdMsg)
    await notifyRecipient({
      conversationId: conversationId.toHexString(),
      message: createdMsg,
      receiverId: receiverId.toHexString(),
    });
  if (createdConv) notifyConvUpdate({ conversation: createdConv });

  return createdMsg;
}
