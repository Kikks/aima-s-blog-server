import { AppContext } from "../../../types/AppContext.type";
import { checkAdmin } from "../../../utils/checkAuth";
import { Theme } from "../../../database/models";
import { OTheme } from "../../../types";
import { ApolloError } from "apollo-server-express";

const ThemeMutations = {
  async createTheme(
    _root: undefined,
    { name }: { name: string },
    context: AppContext
  ): Promise<OTheme> {
    try {
      checkAdmin(context);

      const theme = await Theme.create({
        name,
      });

      return theme;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async deleteTheme(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const theme = await Theme.findById(id);

      if (!theme) throw new ApolloError("No theme with that id exists.");

      await theme.delete();

      return `Theme with id: ${id} deleted successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default ThemeMutations;
