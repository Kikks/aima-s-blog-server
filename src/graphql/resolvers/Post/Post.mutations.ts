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
        preview: preview.replace(/(<([^>]+)>)/gi, ""),
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
        preview: preview.replace(/(<([^>]+)>)/gi, ""),
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
        publishedAt: new Date(),
      });

      return `Post with id: ${id} published successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async unpublishPost(
    _root: undefined,
    { id }: { id: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const post = await Post.findById(id);
      if (!post) throw new ApolloError("No post with that id exists.");

      const featuredPost = await FeaturedPost.findOne({ post: id });
      if (featuredPost) {
        await featuredPost.delete();
      }

      await post.update({
        isPublished: false,
        publishedAt: new Date(),
      });

      return `Post with id: ${id} unpublished successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async featurePost(
    _root: undefined,
    { postId, themeId, index }: { postId: string; themeId: string; index?: number },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);
      let newPostIndex = 0;

      const count = await FeaturedPost.count();
      if (count >= 3) throw new ApolloError("You can only feature 3 posts");

      const existingFeaturedPost = await FeaturedPost.findOne({ post: postId });
      if (existingFeaturedPost) throw new UserInputError("That post has been featured already");

      if (index) {
        if (index < 0 || index > 2)
          throw new UserInputError("Featured post index must be between 0 and 2");

        const postAtIndex = await FeaturedPost.findOne({ index });
        if (postAtIndex) throw new ApolloError("There is a featured post at that index already.");
      } else {
        const existingFeaturedPosts = await FeaturedPost.find().sort({ index: "asc" });
        const existingIndices = existingFeaturedPosts.map((post) => post.index);
        const possiblePostIndices = [0, 1, 2];

        for (let i = 0; i < possiblePostIndices.length; i++) {
          if (!existingIndices.includes(possiblePostIndices[i])) {
            newPostIndex = possiblePostIndices[i];
            break;
          }
        }
      }

      const post = await Post.findById(postId);
      if (!post) throw new ApolloError("No post with that id exists.");
      if (!post?.isPublished) throw new ApolloError("You cannot feature a draft.");

      const theme = await Theme.findById(themeId);
      if (!theme) throw new ApolloError("No theme with that id exists.");

      await FeaturedPost.create({
        index: typeof index !== "undefined" ? index : newPostIndex,
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
    { postId }: { postId: string },
    context: AppContext
  ): Promise<string> {
    try {
      checkAdmin(context);

      const featurePost = await FeaturedPost.findOne({ post: postId });
      if (!featurePost) throw new ApolloError("That post is not featured.");

      await featurePost.delete();

      return `Featured post with id: ${postId} has been unfeatured successfully.`;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default PostMutations;
