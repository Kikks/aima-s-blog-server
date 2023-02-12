import { ApolloError, AuthenticationError, UserInputError } from "apollo-server-express";
import { AppContext } from "../../../types/AppContext.type";
import { checkUser } from "../../../utils/checkAuth";
import { Comment, User } from "../../../database/models";
import { validateCreateCommentInput } from "../../../utils/validators/Comment.validator";
import { IComment, OComment } from "../../../types";

const CommentMutations = {
  async createComment(
    _root: undefined,
    { postId, input }: { postId: string; input: IComment },
    context: AppContext
  ): Promise<OComment> {
    try {
      const user: any = await checkUser(context);

      const { valid, errors } = validateCreateCommentInput(input);
      if (!valid)
        throw new UserInputError("Something is wrong with your inputs.", {
          errors,
        });

      const storedUser = await User.findOne({ email: user?.email as string });
      if (!storedUser) throw new ApolloError("User does not exist.");

      const comment = await Comment.create({
        post: postId,
        body: input?.body,
        user: storedUser?._id,
      });

      const populatedComment = await comment.populate("user");

      return populatedComment;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async updateComment(
    _root: undefined,
    { id, input }: { id: string; input: IComment },
    context: AppContext
  ): Promise<string> {
    try {
      const user: any = await checkUser(context);

      const { valid, errors } = validateCreateCommentInput(input);
      if (!valid)
        throw new UserInputError("Something is wrong with your inputs.", {
          errors,
        });

      const comment = await Comment.findById(id);
      if (!comment) throw new ApolloError("No comment with that id exists.");

      const storedUser = await User.findOne({ email: user?.email as string });
      if (!storedUser) throw new ApolloError("User does not exist.");

      if (comment?.user?.toString() !== storedUser?._id?.toString())
        throw new AuthenticationError("You are not permitted to update this comment");

      await comment.update({
        ...input,
      });

      return `Comment with id: ${id} updated successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async deleteComment(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      const user: any = await checkUser(context);

      const comment = await Comment.findById(id);
      if (!comment) throw new ApolloError("No comment with that id exists.");

      const storedUser = await User.findOne({ email: user?.email as string });
      if (!storedUser) throw new ApolloError("User does not exist.");

      if (comment?.user?.toString() !== storedUser?._id?.toString())
        throw new AuthenticationError("You are not permitted to delete this comment");

      await comment.delete();

      return `Comment with id: ${id} deleted successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default CommentMutations;
