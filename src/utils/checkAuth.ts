import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import { Request } from "express";
import { OAdmin } from "../types";
import { auth0Options, getKey } from "../clients/jwks";

dotenv.config();

export const checkAdmin = (context: { req: Request }) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY as string) as OAdmin;
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired Token", { error });
      }
    }
    throw new Error('Authentication token must be "Bearer [token]"');
  }
  throw new Error("Authentication Header must be provided");
};

export const checkUser = (context: { req: Request }) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = new Promise((resolve, reject) => {
          jwt.verify(token, getKey, auth0Options, (err, decoded) => {
            if (err) {
              return reject(err);
            }
            resolve(decoded);
          });
        });

        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired Token", { error });
      }
    }
    throw new Error('Authentication token must be "Bearer [token]"');
  }
  throw new Error("Authentication Header must be provided");
};
