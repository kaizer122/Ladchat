import { ObjectId } from "mongodb";
import { userLoader } from "../modules/user/loaders/userLoader";

interface Loaders {
  userLoader: ReturnType<typeof userLoader>;
}

export interface IContext {
  isAuthed: boolean;
  userId?: ObjectId;
  bearerToken?: string;
  loaders: Loaders;
}

export interface IAuthedContext {
  isAuthed: boolean;
  userId: ObjectId;
  bearerToken?: string;
  loaders: Loaders;
}
