import merge from "lodash.merge";
import { adminResolvers } from "./Admin";
import { categoryResolvers } from "./Category";
import { userResolvers } from "./User";

export const resolvers = merge(categoryResolvers, adminResolvers, userResolvers);
