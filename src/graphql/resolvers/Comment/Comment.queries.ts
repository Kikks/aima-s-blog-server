import { UserInputError } from "apollo-server-express";
import { Comment } from "../../../database/models";
import { OComment } from "../../../types";
import { Pagination } from "../../../types/Pagination.type";
import { QueryParams } from "../../../types/QueryParams.type";
import { generateMeta } from "../../../utils/misc";
import { validateQueryParams } from "../../../utils/validators/QueryParams.validator";

const CommentQueries = {
  async getComments(
    _root: any,
    { limit = 20, page = 1, postId }: QueryParams & { postId: string }
  ): Promise<Pagination<OComment>> {
    try {
      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      const query = { post: postId };

      const count = await Comment.count(query);
      const data = await Comment.find(query)
        .populate("user")
        .skip(page - 1)
        .limit(limit)
        .sort({ createdAt: "desc" });

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

export default CommentQueries;
