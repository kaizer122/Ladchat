import { isValidObjectId } from "mongoose";
import { Field, InputType } from "type-graphql";
import { object, string } from "yup";

@InputType()
export class SendMessageInput {
  @Field()
  message: string;

  @Field({ nullable: true })
  conversationId?: string;

  @Field({ nullable: true })
  receiverId?: string;

  static schema = object().shape(
    {
      message: string().required(),
      conversationId: string().when("receiverId", {
        is: (receiverId: string) => !receiverId || receiverId.length === 0,
        then: string()
          .required()
          .test((v) => isValidObjectId(v)),
        otherwise: string().nullable(),
      }),
      receiverId: string().when("conversationId", {
        is: (conversationId: string) =>
          !conversationId || conversationId.length === 0,
        then: string()
          .required()
          .test((v) => isValidObjectId(v)),
        otherwise: string().nullable(),
      }),
    },
    [["conversationId", "receiverId"]]
  );
}
