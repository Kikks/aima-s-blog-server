import { UserInputError } from "apollo-server-express";
import { Theme } from "../../../database/models";
import { OTheme } from "../../../types";

const ThemeQueries = {
  async getTheme(_root: any, { id }: { id: string }): Promise<OTheme> {
    try {
      const theme = await Theme.findById(id);

      if (!theme) {
        throw new UserInputError("No theme with that id exists.");
      }

      return theme;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getThemes(_root: any, _inputs: any): Promise<OTheme[]> {
    try {
      const data = await Theme.find();

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default ThemeQueries;
