import mongoose, { Schema } from "mongoose";
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
  },
  { timestamps: true }
);

PostSchema.plugin(slug);

const Post = mongoose.model("Post", PostSchema);

export default Post;
