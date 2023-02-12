import { ObjectId } from "mongodb";

type ICategory = {
  name: string;
  image?: string;
  description?: string;
};

type OCategory = {
  _id: ObjectId;
  name: string;
  image?: string;
  description?: string;
  isFeatured?: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { ICategory, OCategory };
