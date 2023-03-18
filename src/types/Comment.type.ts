import { ObjectId } from "mongodb";
import { Document, PopulatedDoc } from "mongoose";
import { OUser } from "./User.type";

type IComment = {
  body: string;
};

type OComment = {
  _id: ObjectId;
  body: string;
  post?: ObjectId;
  comment?: ObjectId;
  user: PopulatedDoc<OUser & Document>;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { IComment, OComment };
