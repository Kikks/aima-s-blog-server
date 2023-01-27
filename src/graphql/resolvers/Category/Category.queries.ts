import { UserInputError } from "apollo-server-express";
import { Category } from "../../../database/models";
import { OCategory } from "../../../types";
import { Pagination } from "../../../types/Pagination.type";
import { QueryParams } from "../../../types/QueryParams.type";
import { generateMeta } from "../../../utils/misc";
import { isEmpty } from "../../../utils/validators/helpers";
import { validateQueryParams } from "../../../utils/validators/QueryParams.validator";

const CategoryQueries = {
  getCategories: async (
    _root: any,
    { limit = 20, page = 1, search = "" }: QueryParams
  ): Promise<Pagination<OCategory>> => {
    try {
      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      let count: number;
      let data: OCategory[];

      if (isEmpty(search)) {
        count = await Category.count();
        data = await Category.find()
          .skip(page - 1)
          .limit(limit);
      } else {
        const query = { name: { $regex: `.*${search}*.` } };
        count = await Category.count(query);
        data = await Category.find(query)
          .skip(page - 1)
          .limit(limit);
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
};

export default CategoryQueries;
