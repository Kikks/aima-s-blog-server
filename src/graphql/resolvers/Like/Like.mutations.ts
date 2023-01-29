import { ApolloError } from "apollo-server-express";
import { AppContext } from "../../../types/AppContext.type";
import { checkUser } from "../../../utils/checkAuth";
import { Like, User } from "../../../database/models";

const LikeMutations = {
  async likePost(
    _root: undefined,
    { postId }: { postId: string },
    context: AppContext
  ): Promise<string> {
    try {
      const user: any = await checkUser(context);

      const storedUser = await User.findOne({ email: user?.email as string });
      if (!storedUser) throw new ApolloError("User does not exist.");

      const like = await Like.findOne({
        post: postId,
        user: storedUser?._id,
      });

      if (like) {
        await like.delete();
        return "Post unliked successfully";
      } else {
        await Like.create({
          post: postId,
          user: storedUser?._id,
        });
        return "Post liked successfully";
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default LikeMutations;
