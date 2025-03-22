import "dotenv/config";

import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";

import { startdb } from "./database";
import { resolvers, typeDefs } from "./graphql";
import cors from "cors";
import routes from "./rest/routes";

const PORT = process.env.PORT || 5000;

const mount = async (app: Application) => {
  try {
    app.use(cors());
    app.use(express.json());

    routes(app);
    startdb();
    console.log("[db]: Mongoose connected");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req }),
    });
    await server.start();
    // @ts-ignore
    server.applyMiddleware({ app, path: "/api" });

    app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

mount(express());
