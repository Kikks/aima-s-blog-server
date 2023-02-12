import { Application } from "express";
import { handleGetUrlMetadata } from "./handlers";

const routes = (app: Application) => {
  app.get("/url-metadata", handleGetUrlMetadata);
};

export default routes;
