import { UserInputError } from "apollo-server-express";
import { Comment, Like } from "../../../database/models";
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
        .skip((page - 1) * limit)
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
  async getCommentsForComment(
    _root: any,
    { limit = 20, page = 1, commentId }: QueryParams & { commentId: string }
  ): Promise<Pagination<OComment>> {
    try {
      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      const query = { comment: commentId };

      const count = await Comment.count(query);
      const data = await Comment.find(query)
        .populate("user")
        .skip((page - 1) * limit)
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
  async getCommentLikesAndCommentsCount(
    _root: any,
    { commentId }: { commentId: string }
  ): Promise<{ comments: number; likes: number }> {
    try {
      const likes = await Like.count({ comment: commentId });
      const comments = await Comment.count({ comment: commentId });

      return {
        likes,
        comments,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default CommentQueries;
