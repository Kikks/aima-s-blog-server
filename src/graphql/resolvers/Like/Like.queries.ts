import { ApolloError } from "apollo-server-express";
import { Like, User } from "../../../database/models";
import { OLike } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { checkUser } from "../../../utils/checkAuth";

const LikeQueries = {
  async getUserLikeForPost(
    _root: any,
    { postId }: { postId: string },
    context: AppContext
  ): Promise<OLike | null> {
    try {
      const user: any = await checkUser(context);

      const storedUser = await User.findOne({ email: user?.email as string });
      if (!storedUser) throw new ApolloError("User does not exist.");

      const like = await Like.findOne({
        post: postId,
        user: storedUser?._id,
      });

      return like;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default LikeQueries;
