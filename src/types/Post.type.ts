import { ObjectId } from "mongodb";
import { Document, PopulatedDoc } from "mongoose";
import { ICategory } from "./Category.type";
import { OTheme } from "./Theme.type";

type IPost = {
  title: string;
  coverImage?: string;
  body: string;
  category: ObjectId;
  audio?: string;
};

type OPost = {
  _id?: ObjectId;
  audio?: string;
  title: string;
  slug?: string;
  coverImage?: string;
  preview: string;
  body: string;
  category?: PopulatedDoc<ICategory & Document>;
  isPublished: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

type OFeaturedPost = {
  post: PopulatedDoc<OPost & Document>;
  theme: PopulatedDoc<OTheme & Document>;
};

export { IPost, OPost, OFeaturedPost };
