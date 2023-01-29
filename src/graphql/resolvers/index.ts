import merge from "lodash.merge";
import { adminResolvers } from "./Admin";
import { categoryResolvers } from "./Category";
import { commentResolvers } from "./Comment";
import { likeResolvers } from "./Like";
import { postResolvers } from "./Post";
import { themeResolvers } from "./Theme";
import { userResolvers } from "./User";

export const resolvers = merge(
  categoryResolvers,
  adminResolvers,
  userResolvers,
  postResolvers,
  likeResolvers,
  commentResolvers,
  themeResolvers
);
