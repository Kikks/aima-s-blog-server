import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
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

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
