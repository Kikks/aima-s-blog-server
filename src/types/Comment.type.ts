import { ObjectId } from "mongodb";
import { OUser } from "./User.type";

type IComment = {
  body: string;
  post: ObjectId;
  user: ObjectId;
};

type OComment = {
  _id: ObjectId;
  body: string;
  post: ObjectId;
  user: OUser;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { IComment, OComment };
