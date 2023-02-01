import { ApolloError, UserInputError } from "apollo-server-express";
import { AppContext } from "../../../types/AppContext.type";
import { checkAdmin } from "../../../utils/checkAuth";
import { Category } from "../../../database/models";
import { ICategory, OCategory } from "../../../types";
import { validateCreateCategoryInput } from "../../../utils/validators";

const CategoryMutations = {
  async createCategory(
    _root: undefined,
    { input }: { input: ICategory },
    context: AppContext
  ): Promise<OCategory> {
    try {
      checkAdmin(context);

      const { valid, errors } = validateCreateCategoryInput(input);
      if (!valid)
        throw new UserInputError("Something is wrong with your inputs.", {
          errors,
        });

      const existingCategory = await Category.findOne({
        name: input.name.toLowerCase(),
      });

      if (existingCategory) throw new UserInputError("A category with that name already exists.");

      const category = await Category.create({
        ...input,
        name: input.name.toLowerCase(),
      });
      return category;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async updateCategory(
    _root: undefined,
    { id, input }: { id: string; input: ICategory },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const { valid, errors } = validateCreateCategoryInput(input);
      if (!valid)
        throw new UserInputError("Something is wrong with your inputs.", {
          errors,
        });

      const category = await Category.findById(id);

      if (!category) throw new ApolloError("No category with that id exists.");

      await category.update({
        ...input,
        name: input.name.toLowerCase(),
      });

      return `Category with id: ${id} updated sucessfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async deleteCategory(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const category = await Category.findById(id);

      if (!category) throw new ApolloError("No category with that id exists.");

      await category.delete();

      return `Category with id: ${id} deleted successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async featureCategory(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const category = await Category.findById(id);

      if (!category) throw new ApolloError("No category with that id exists.");

      await category.update({
        isFeatured: true,
      });

      return `Category with id: ${id} has been featured successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async unfeatureCategory(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const category = await Category.findById(id);

      if (!category) throw new ApolloError("No category with that id exists.");

      await category.update({
        isFeatured: false,
      });

      return `Category with id: ${id} has been unfeatured successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default CategoryMutations;
