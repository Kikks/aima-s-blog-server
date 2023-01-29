import mongoose, { Schema } from "mongoose";

const FeaturedPostSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    theme: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Theme",
    },
  },
  { timestamps: true }
);

const FeaturedPost = mongoose.model("FeaturedPost", FeaturedPostSchema);

export default FeaturedPost;
