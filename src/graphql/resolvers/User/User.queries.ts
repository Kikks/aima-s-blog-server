import { UserInputError } from "apollo-server-express";
import { User } from "../../../database/models";
import { OUser } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { Pagination } from "../../../types/Pagination.type";
import { QueryParams } from "../../../types/QueryParams.type";
import { checkAdmin } from "../../../utils/checkAuth";
import { generateMeta } from "../../../utils/misc";
import { isEmpty } from "../../../utils/validators/helpers";
import { validateQueryParams } from "../../../utils/validators/QueryParams.validator";

const UserQueries = {
  async getUser(_root: any, { id }: { id: string }, context: AppContext): Promise<OUser> {
    try {
      checkAdmin(context);

      const user = await User.findById(id);

      if (!user) {
        throw new UserInputError("No user with that id exists.");
      }

      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getUsers(
    _root: any,
    { limit = 20, page = 1, search = "" }: QueryParams,
    context: AppContext
  ): Promise<Pagination<OUser>> {
    try {
      checkAdmin(context);

      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      let count: number;
      let data: OUser[];

      if (isEmpty(search)) {
        count = await User.count();
        data = await User.find()
          .skip(page - 1)
          .limit(limit);
      } else {
        const query = { name: { $regex: `.*${search}*.` } };
        count = await User.count(query);
        data = await User.find(query)
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

export default UserQueries;
