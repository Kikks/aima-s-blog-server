import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
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

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
