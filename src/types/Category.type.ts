import { ObjectId } from "mongodb";

type ICategory = {
  name: string;
  image?: string;
};

type OCategory = {
  _id: ObjectId;
  name: string;
  image?: string;
  isFeatured?: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { ICategory, OCategory };
