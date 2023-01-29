import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OPost } from "../../../types";
import PostMutations from "./Post.mutations";
import PostQueries from "./Post.queries";

export const postResolvers: IResolvers = {
  Query: PostQueries,
  Mutation: PostMutations,

  Post: {
    id: (post: OPost): string => (post?._id as ObjectId).toString(),
  },
};
