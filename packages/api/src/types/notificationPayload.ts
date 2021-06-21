import { ObjectId } from "mongodb";

export interface NotificationPayload {
  receiverId: ObjectId;
  message: string;
}
