import { ApolloError } from "apollo-server-express";
import { User } from "../../../database/models";
import { OUser } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { checkUser } from "../../../utils/checkAuth";

const UserMutations = {
  async login(_root: any, _: any, context: AppContext): Promise<OUser> {
    try {
      const user: any = await checkUser(context);
      let savedUser: OUser;

      const existingUser = await User.findOne({ email: user?.email as string });

      if (existingUser) {
        if (existingUser.name !== user?.name || existingUser.image !== user?.picture) {
          await existingUser.update({
            name: user?.name || "",
            image: user?.picture || "",
            email: user?.email || "",
          });
        }

        savedUser = existingUser;
      } else {
        const newUser = await User.create({
          name: user?.name || "",
          image: user?.picture || "",
          email: user?.email || "",
        });
        savedUser = newUser;
      }

      return savedUser;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async deleteAccount(_root: any, _: any, context: AppContext): Promise<string> {
    try {
      const user: any = await checkUser(context);

      const existingUser = await User.findOne({ email: user?.email as string });

      if (!existingUser) throw new ApolloError("User does not exist.");

      await existingUser.delete();

      return "Account deleted successfully.";
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default UserMutations;
