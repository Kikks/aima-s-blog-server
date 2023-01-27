import { ObjectId } from "mongodb";

type IUser = {
  name: string;
  email: string;
  image?: string;
};

type OUser = {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { IUser, OUser };
