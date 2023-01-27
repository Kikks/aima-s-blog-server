import { ApolloError } from "apollo-server-express";
import Admin from "../../../database/models/Admin.model";
import { OAdmin } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { checkAdmin } from "../../../utils/checkAuth";

const AdminQueries = {
  getAdmin: async (_: any, __: undefined, context: AppContext): Promise<OAdmin> => {
    try {
      const admin = checkAdmin(context);

      const administrator = await Admin.findById(admin._id);

      if (!administrator) throw new ApolloError("Admin does not exist.");

      return administrator;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default AdminQueries;
