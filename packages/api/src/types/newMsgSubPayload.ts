import { Message } from "../modules/conversation/entities/message";

export interface NewMsgSubPayload {
  receiverId: string;
  conversationId: string;
  message: Message;
}
