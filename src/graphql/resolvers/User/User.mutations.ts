import { User } from "../../../database/models";
import { AppContext } from "../../../types/AppContext.type";
import { checkUser } from "../../../utils/checkAuth";

const UserMutations = {
  async login(_root: any, _: any, context: AppContext) {
    try {
      const user: any = await checkUser(context);

      const existingUser = await User.findOne({ email: user?.email as string });

      if (existingUser) {
        if (existingUser.name !== user?.name || existingUser.image !== user?.picture) {
          await existingUser.update({
            name: user?.name || "",
            image: user?.picture || "",
            email: user?.email || "",
          });
        }
      } else {
        await User.create({
          name: user?.name || "",
          image: user?.picture || "",
          email: user?.email || "",
        });
      }

      return "User logged in successfully.";
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default UserMutations;
