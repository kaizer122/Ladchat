import { ObjectId } from "mongodb";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../../../loaders/graphql/scalars/objectId";
import { RequireAuth } from "../../../middlewares";
import { IAuthedContext } from "../../../types/myContext";
import { User, UserModel } from "../entities/User";

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @RequireAuth()
  async user(@Arg("userId", () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId).lean();
  }

  @Query(() => User)
  @RequireAuth()
  async me(
    @Ctx()
    ctx: IAuthedContext
  ): Promise<User | null> {
    return await UserModel.findById(ctx.userId).lean();
  }
}
