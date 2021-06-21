import {} from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Ref } from "../types/ref";

export const toObjectId = (
  param: Ref<string | Record<string, any> | ObjectId>
): ObjectId => {
  // is Document
  if (param instanceof ObjectId) return param;
  else if (typeof param === "object" && param.hasOwnProperty("_id"))
    return new ObjectId(param._id);
  // Is string or is already an ObjectId
  else if (typeof param === "string") return new ObjectId(param);

  throw new Error("Conversion to objectId failed");
};
