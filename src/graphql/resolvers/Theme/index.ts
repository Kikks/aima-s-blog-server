import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { OTheme } from "../../../types";
import ThemeMutations from "./Theme.mutations";
import ThemeQueries from "./Theme.queries";

export const themeResolvers: IResolvers = {
  Query: ThemeQueries,
  Mutation: ThemeMutations,

  Theme: {
    id: (theme: OTheme): string => (theme?._id as ObjectId).toString(),
  },
};
