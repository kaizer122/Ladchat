import DataLoader from "dataloader";
import { User, UserModel } from "../entities/User";
type BatchUser = (ids: readonly string[]) => Promise<User[]>;

const batchUsers: BatchUser = async (ids) => {
  const users = await UserModel.find({ _id: { $in: ids as string[] } }).lean();
  const userMap: { [key: string]: User } = {};
  users.forEach((user) => {
    userMap[user._id.toHexString()] = user;
  });
  return ids.map((id) => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);
