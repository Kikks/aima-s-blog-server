import { ObjectId } from "mongodb";

type IAdmin = {
  firstName: string;
  lastName: string;
  image?: string;
  email: string;
  password?: string;
};

type OAdmin = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  image?: string;
  email: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export { IAdmin, OAdmin };
