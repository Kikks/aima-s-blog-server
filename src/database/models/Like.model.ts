import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Post",
    },
    comment: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Comment",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", LikeSchema);

export default Like;
