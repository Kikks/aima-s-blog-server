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
  async getLatestTheme(): Promise<OTheme> {
    const theme = await Theme.findOne().sort({ createdAt: "desc" });

    if (!theme) {
      throw new UserInputError("No theme exists.");
    }

    return theme;
  },
  async getThemes(): Promise<OTheme[]> {
    try {
      const data = await Theme.find().sort({ name: "asc" });

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default ThemeQueries;
