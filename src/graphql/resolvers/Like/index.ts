import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OLike } from "../../../types";
import LikeMutations from "./Like.mutations";
import LikeQueries from "./Like.queries";

export const likeResolvers: IResolvers = {
  Query: LikeQueries,
  Mutation: LikeMutations,

  Like: {
    id: (like: OLike): string => (like?._id as ObjectId).toString(),
  },
};
