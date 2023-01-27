import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OAdmin } from "../../../types";
import AdminMutations from "./Admin.mutations";
import AdminQueries from "./Admin.queries";

export const adminResolvers: IResolvers = {
  Query: AdminQueries,
  Mutation: AdminMutations,

  Admin: {
    id: (admin: OAdmin): string => (admin?._id as ObjectId).toString(),
  },
};
