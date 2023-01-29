import { ObjectId } from "mongodb";

export type ITheme = {
  name: string;
};

export type OTheme = {
  _id?: ObjectId;
  name: string;
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
};
