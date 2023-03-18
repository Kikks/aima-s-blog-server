import mongoose, { Schema } from "mongoose";
import Like from "./Like.model";

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

CommentSchema.pre("deleteMany", async function (next) {
  // @ts-ignore
  if (this?._id) {
    // @ts-ignore
    await Comment.deleteMany({ post: this._id });
    // @ts-ignore
    await Like.deleteMany({ post: this._id });
  }

  next();
});

CommentSchema.pre("deleteOne", async function (next) {
  // @ts-ignore
  if (this?._id) {
    // @ts-ignore
    await Comment.deleteMany({ post: this._id });
    // @ts-ignore
    await Like.deleteMany({ post: this._id });
  }

  next();
});

CommentSchema.pre("remove", async function (next) {
  // @ts-ignore
  if (this?._id) {
    // @ts-ignore
    await Comment.deleteMany({ post: this._id });
    // @ts-ignore
    await Like.deleteMany({ post: this._id });
  }

  next();
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
