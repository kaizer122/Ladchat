import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class NewMsgSubArgs {
  @Field(() => ID, { nullable: true })
  conversationId?: string;
}

export default NewMsgSubArgs;
