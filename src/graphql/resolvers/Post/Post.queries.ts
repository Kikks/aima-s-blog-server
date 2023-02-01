import { ApolloError, UserInputError } from "apollo-server-express";
import { Comment, FeaturedPost, Like, Post } from "../../../database/models";
import { OFeaturedPost, OPost } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { Pagination } from "../../../types/Pagination.type";
import { QueryParams } from "../../../types/QueryParams.type";
import { checkAdmin } from "../../../utils/checkAuth";
import { generateMeta } from "../../../utils/misc";
import { isEmpty } from "../../../utils/validators/helpers";
import { validateQueryParams } from "../../../utils/validators/QueryParams.validator";

const PostQueries = {
  async getPost(
    _root: any,
    { slug }: { slug: string }
  ): Promise<{ post: OPost; comments: number; likes: number }> {
    try {
      const post = await Post.findOne({ slug }).populate("category");

      if (!post || !post?.isPublished) throw new ApolloError("No post with that slug exists");

      const likes = await Like.count({ post: post?._id });
      const comments = await Comment.count({ post: post?._id });

      return {
        post,
        likes,
        comments,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getPreviousAndNextPosts(
    _root: any,
    { postId }: { postId: string }
  ): Promise<{ prev?: OPost | null; next: OPost | null }> {
    try {
      const post = await Post.findById(postId);
      if (!post) throw new ApolloError("No post with that id exists");

      const prev = await Post.findOne({ createdAt: { $lt: post?.createdAt } })
        .populate("category")
        .sort({
          createdAt: "desc",
        });

      const next = await Post.findOne({ createdAt: { $gt: post?.createdAt } })
        .populate("category")
        .sort({
          createdAt: "asc",
        });

      return { prev, next };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async adminGetPost(
    _root: any,
    { id }: { id: string },
    context: AppContext
  ): Promise<{ post: OPost; comments: number; likes: number }> {
    try {
      checkAdmin(context);
      const post = await Post.findById(id).populate("category");
      const likes = await Like.count({ _id: id });
      const comments = await Comment.count({ _id: id });

      if (!post) {
        throw new UserInputError("No post with that id exists.");
      }

      return {
        post,
        likes,
        comments,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getPosts(
    _root: any,
    {
      limit = 20,
      page = 1,
      search = "",
      category = "",
      sortBy = "createdAt",
      order = "desc",
    }: QueryParams & { category?: string; sortBy?: string; order?: "desc" | "asc" }
  ): Promise<Pagination<OPost>> {
    try {
      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      const query = {
        title: { $regex: isEmpty(search) ? "" : `.*${search}*.`, $options: "i" },
        isPublished: true,
        ...(category ? { category } : {}),
      };

      const count = await Post.count(query);
      const data = await Post.find(query)
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [sortBy]: order });

      return {
        data,
        meta: generateMeta(page, count, limit),
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getAllPosts(
    _root: any,
    {
      limit = 20,
      page = 1,
      search = "",
      category = "",
      isPublished,
      sortBy = "createdAt",
      order = "desc",
    }: QueryParams & {
      category?: string;
      isPublished?: boolean;
      sortBy?: string;
      order?: "desc" | "asc";
    },
    context: AppContext
  ): Promise<Pagination<OPost>> {
    try {
      checkAdmin(context);

      const { valid } = validateQueryParams({ limit, page });
      if (!valid) throw new UserInputError("Invalid query params.");

      const query = {
        title: { $regex: isEmpty(search) ? "" : `.*${search}*.`, $options: "i" },
        ...(category ? { category } : {}),
        ...(typeof isPublished === "undefined" ? {} : { isPublished }),
      };

      const count = await Post.count(query);
      const data = await Post.find(query)
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [sortBy]: order });

      return {
        data,
        meta: generateMeta(page, count, limit),
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async getFeaturedPosts(): Promise<OFeaturedPost[]> {
    try {
      const data = await FeaturedPost.find()
        .populate({
          path: "post",
          populate: "category",
        })
        .populate("theme")
        .sort({ createdAt: "asc" });

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default PostQueries;
