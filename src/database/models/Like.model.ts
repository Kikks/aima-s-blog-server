import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
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
