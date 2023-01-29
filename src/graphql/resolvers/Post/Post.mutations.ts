import { ApolloError, UserInputError } from "apollo-server-express";
import { Category, FeaturedPost, Post, Theme } from "../../../database/models";
import { IPost, OPost } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { checkAdmin } from "../../../utils/checkAuth";
import { validateCreatePostInput } from "../../../utils/validators/Post.validator";

const PostMutations = {
  async createPost(
    _root: undefined,
    { input }: { input: IPost },
    context: AppContext
  ): Promise<OPost> {
    try {
      checkAdmin(context);

      const { valid, errors } = validateCreatePostInput(input);
      if (!valid)
        throw new UserInputError("Something is wrong with your inputs.", {
          errors,
        });

      const existingCategory = await Category.findById(input.category);
      if (!existingCategory) throw new UserInputError("No category with that id exists.");

      const parsedBody: any = JSON.parse(input.body);
      const previewElement: any = (parsedBody.blocks || [])?.find(
        (item: any) => item.type === "paragraph"
      );
      const preview = previewElement?.data?.text || "";

      const post = await Post.create({
        ...input,
        preview,
      });

      const populatedPost = await post.populate("category");

      return populatedPost;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async updatePost(
    _root: undefined,
    { id, input }: { id: string; input: IPost },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const { valid, errors } = validateCreatePostInput(input);
      if (!valid)
        throw new UserInputError("Something is wrong with your inputs.", {
          errors,
        });

      const post = await Post.findById(id);
      if (!post) throw new ApolloError("No post with that id exists.");

      const existingCategory = await Category.findById(input.category);
      if (!existingCategory) throw new UserInputError("No category with that id exists.");

      const parsedBody: any = JSON.parse(input.body);
      const previewElement: any = (parsedBody.blocks || [])?.find(
        (item: any) => item.type === "paragraph"
      );
      const preview = previewElement?.data?.text || "";

      await post.update({
        ...input,
        preview,
      });

      return `Post with id: ${id} updated successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async deletePost(_root: undefined, { id }: { id: string }, context: AppContext): Promise<string> {
    try {
      checkAdmin(context);

      const post = await Post.findById(id);
      if (!post) throw new ApolloError("No post with that id exists.");

      await post.delete();

      return `Post with id: ${id} deleted successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async publishPost(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const post = await Post.findById(id);
      if (!post) throw new ApolloError("No post with that id exists.");

      await post.update({
        isPublished: true,
      });

      return `Post with id: ${id} published successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async featurePost(
    _root: undefined,
    { postId, themeId }: { postId: string; themeId: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const count = await FeaturedPost.count();
      if (count >= 3) throw new ApolloError("You can only feature 3 posts");

      const post = await Post.findById(postId);
      if (!post) throw new ApolloError("No post with that id exists.");

      const theme = await Theme.findById(themeId);
      if (!theme) throw new ApolloError("No theme with that id exists.");

      await FeaturedPost.create({
        post: postId,
        theme: themeId,
      });

      return `Post with id: ${postId} has been featured successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async unfeaturePost(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const featurePost = await FeaturedPost.findById(id);
      if (!featurePost) throw new ApolloError("No featured post with that id exists.");

      await featurePost.delete();

      return `Featured post with id: ${id} has been unfeatured successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default PostMutations;
