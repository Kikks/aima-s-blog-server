import { UserInputError } from "apollo-server-express";
import { Category, Post } from "../../../database/models";
import { OCategory } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { Pagination } from "../../../types/Pagination.type";
import { QueryParams } from "../../../types/QueryParams.type";
import { checkAdmin } from "../../../utils/checkAuth";
import { generateMeta } from "../../../utils/misc";
import { isEmpty } from "../../../utils/validators/helpers";
import { validateQueryParams } from "../../../utils/validators/QueryParams.validator";

const CategoryQueries = {
  async getCategory(_root: any, { id }: { id: string }): Promise<OCategory> {
    try {
      const category = await Category.findById(id);

      if (!category) {
        throw new UserInputError("No category with that id exists.");
      }

      return category;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getCategories(
    _root: any,
    { limit = 20, page = 1, search = "" }: QueryParams
  ): Promise<Pagination<OCategory>> {
    try {
      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      const query = { name: { $regex: isEmpty(search) ? "" : `.*${search}*.`, $options: "i" } };

      const count = await Category.count(query);
      const data = await Category.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ name: "asc" });

      return {
        data,
        meta: generateMeta(page, count, limit),
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getFeaturedCategories(): Promise<OCategory[]> {
    try {
      const query = { isFeatured: true };

      const data = await Category.find(query).sort({ name: "asc" });

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getCategoriesStats(
    _root: any,
    { limit = 20, page = 1, search = "" }: QueryParams,
    context: AppContext
  ): Promise<
    Pagination<{
      category: OCategory;
      posts: number;
    }>
  > {
    try {
      checkAdmin(context);

      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      const query = { name: { $regex: isEmpty(search) ? "" : `.*${search}*.`, $options: "i" } };

      const count = await Category.count(query);
      const categories = await Category.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ name: "asc" });

      const data: { category: OCategory; posts: number }[] = [];

      for (let i = 0; i < categories.length; i++) {
        const posts = await Post.count({ category: categories[i]?._id });
        data.push({
          category: categories[i],
          posts,
        });
      }

      return {
        data,
        meta: generateMeta(page, count, limit),
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async countCategories(_root: any, _input: any, context: AppContext): Promise<number> {
    try {
      checkAdmin(context);

      const count = await Category.count();

      return count;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default CategoryQueries;
