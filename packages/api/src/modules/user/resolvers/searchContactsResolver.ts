import { FilterQuery } from "mongoose";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { RequireAuth } from "../../../middlewares";
import { IAuthedContext } from "../../../types/myContext";
import { getSearchStringQuery } from "../../../utils/queryFunctions";
import { ConversationModel } from "../../conversation/entities/conversation";
import { User, UserModel } from "../entities/User";
import { SearchContactsResponse } from "../returnTypes/searchContactsResponse";

@Resolver(() => SearchContactsResponse)
export class SearchContactsResolver {
  @Query(() => [SearchContactsResponse])
  @RequireAuth()
  async searchContacts(
    @Arg("search", () => String, { nullable: true }) search: string,
    @Ctx()
    { userId }: IAuthedContext
  ) {
    if (!search || search.trim().length === 0) return [];
    let query: FilterQuery<User> = { _id: { $ne: userId } };
    query = getSearchStringQuery<User>(
      ["firstName", "lastName", "email"],
      search,
      query
    );
    return await UserModel.find(query)
      .limit(5)
      .sort("firstName lastName")
      .lean();
  }

  @FieldResolver(() => String, { nullable: true })
  async conversationId(
    @Root() other: SearchContactsResponse,
    @Ctx() { userId }: IAuthedContext
  ) {
    const conversation = await ConversationModel.findOne({
      participants: { $eq: [userId, other._id] },
    });

    if (!conversation) return null;

    return conversation._id;
  }
}
