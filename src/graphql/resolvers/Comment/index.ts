import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OComment } from "../../../types";
import CommentMutations from "./Comment.mutations";
import CommentQueries from "./Comment.queries";

export const commentResolvers: IResolvers = {
  Query: CommentQueries,
  Mutation: CommentMutations,

  Comment: {
    id: (comment: OComment): string => (comment?._id as ObjectId).toString(),
  },
};
