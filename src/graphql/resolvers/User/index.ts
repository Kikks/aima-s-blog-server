import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OUser } from "../../../types";
import UserMutations from "./User.mutations";
import UserQueries from "./User.queries";

export const userResolvers: IResolvers = {
  Query: UserQueries,
  Mutation: UserMutations,

  User: {
    id: (user: OUser): string => (user?._id as ObjectId).toString(),
  },
};
