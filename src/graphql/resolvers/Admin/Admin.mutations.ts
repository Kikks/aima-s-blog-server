import { UserInputError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../../../database/models/";
import { IAdmin, OAdmin } from "../../../types";
import { AppContext } from "../../../types/AppContext.type";
import { checkAdmin } from "../../../utils/checkAuth";
import {
  validateAdminLoginInputs,
  validateCreateAdminInput,
  validateUpdateAdminInputs,
  validateUpdateAdminPasswordInput,
} from "../../../utils/validators/Admin.validator";

const AdminMutations = {
  async adminLogin(
    _: any,
    { input: { email, password } }: { input: { password: string; email: string } }
  ): Promise<{ token: string; user: OAdmin }> {
    try {
      const { valid, errors } = validateAdminLoginInputs({ email, password });
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const admin = await Admin.findOne({ email });
      if (!admin) {
        errors.general = "Admin not found.";
        throw new UserInputError("Admin not found.", { errors });
      }

      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        errors.general = "Wrong Credentials";
        throw new UserInputError("Wrong Credentials");
      }

      const token = jwt.sign(
        {
          _id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          image: admin.image,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "5h" }
      );

      return {
        user: {
          _id: admin._id,
          email: admin.email,
          image: admin.image,
          firstName: admin.firstName,
          lastName: admin.lastName,
          createdAt: admin.createdAt,
          updatedAt: admin.updatedAt,
        },
        token,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async updateAdmin(
    _root: any,
    { input }: { input: IAdmin },
    context: AppContext
  ): Promise<string> {
    try {
      const admin: OAdmin = checkAdmin(context);

      const { valid, errors } = validateUpdateAdminInputs(input);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const administrator = await Admin.findById(admin._id);
      if (!administrator) {
        errors.general = "Admin not found.";
        throw new UserInputError("Admin not found.", { errors });
      }

      await administrator.update(input);
      return "Admin details updated successfully.";
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
  async updateAdminPassword(
    _root: any,
    { password }: { password: string },
    context: AppContext
  ): Promise<string> {
    try {
      const admin: OAdmin = checkAdmin(context);

      const { valid, errors } = validateUpdateAdminPasswordInput({ password });
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const administrator = await Admin.findById(admin._id);
      if (!administrator) {
        errors.general = "Admin not found.";
        throw new UserInputError("Admin not found.", { errors });
      }

      const match = await bcrypt.compare(password, administrator.password);
      if (match) {
        errors.general = "You cannot use your old password.";
        throw new UserInputError("Wrong Credentials", { errors });
      }

      password = await bcrypt.hash(password, 12);

      await administrator.update({
        password,
      });

      return "Password updated successfully.";
    } catch (error: any) {
      throw Error(error);
    }
  },
  async createAdmin(
    _root: any,
    {
      input,
    }: {
      input: IAdmin;
    },
    context: AppContext
  ): Promise<OAdmin> {
    try {
      checkAdmin(context);

      const { valid, errors } = validateCreateAdminInput(input);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const exisintingAdmin = await Admin.findOne({ email: input.email });
      if (exisintingAdmin) {
        throw new UserInputError("An admin with that email address already exists", {
          errors: {
            email: "An admin with that email address already exists",
          },
        });
      }

      const hashedPassword = await bcrypt.hash(input.password as string, 12);
      const admin = await Admin.create({ ...input, password: hashedPassword });

      return admin;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default AdminMutations;
