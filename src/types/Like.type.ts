import { ObjectId } from "mongodb";

type ILike = {
  post: ObjectId;
  user: ObjectId;
};

type OLike = {
  _id: ObjectId;
  post: ObjectId;
  user: ObjectId;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { ILike, OLike };
