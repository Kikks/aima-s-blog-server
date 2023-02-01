import { UserInputError } from "apollo-server-express";
import { Category } from "../../../database/models";
import { OCategory } from "../../../types";
import { Pagination } from "../../../types/Pagination.type";
import { QueryParams } from "../../../types/QueryParams.type";
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
};

export default CategoryQueries;
