import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OCategory } from "../../../types";
import CategoryMutations from "./Category.mutations";
import CategoryQueries from "./Category.queries";

export const categoryResolvers: IResolvers = {
  Query: CategoryQueries,
  Mutation: CategoryMutations,

  Category: {
    id: (category: OCategory): string => (category?._id as ObjectId).toString(),
  },
};
