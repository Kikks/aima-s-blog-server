import { ObjectId } from "mongodb";

type IPost = {
  title: string;
  coverImage?: string;
  body: string;
  category: ObjectId;
};

type OPost = {
  _id?: ObjectId;
  title: string;
  coverImage?: string;
  preview: string;
  body: string;
  category?: ObjectId;
  likes?: number;
  comments?: number;
  isPublished: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { IPost, OPost };
