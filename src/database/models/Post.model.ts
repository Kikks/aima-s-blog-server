import mongoose, { Schema } from "mongoose";
import Comment from "./Comment.model";
import FeaturedPost from "./FeaturedPost.model";
import Like from "./Like.model";
const slug = require("mongoose-slug-generator");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: "",
    },
  },
  { timestamps: true }
);

PostSchema.pre("deleteMany", async function (next) {
  // @ts-ignore
  if (this?._id) {
    // @ts-ignore
    await FeaturedPost.deleteMany({ post: this._id });
    // @ts-ignore
    await Comment.deleteMany({ post: this._id });
    // @ts-ignore
    await Like.deleteMany({ post: this._id });
  }

  next();
});

PostSchema.pre("deleteOne", async function (next) {
  // @ts-ignore
  if (this?._id) {
    // @ts-ignore
    await FeaturedPost.deleteMany({ post: this._id });
    // @ts-ignore
    await Comment.deleteMany({ post: this._id });
    // @ts-ignore
    await Like.deleteMany({ post: this._id });
  }

  next();
});

PostSchema.pre("remove", async function (next) {
  // @ts-ignore
  if (this?._id) {
    // @ts-ignore
    await FeaturedPost.deleteMany({ post: this._id });
    // @ts-ignore
    await Comment.deleteMany({ post: this._id });
    // @ts-ignore
    await Like.deleteMany({ post: this._id });
  }

  next();
});

PostSchema.plugin(slug);

const Post = mongoose.model("Post", PostSchema);

export default Post;
