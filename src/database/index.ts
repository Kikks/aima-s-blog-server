import dotenv from "dotenv";
import mongoose, { disconnect } from "mongoose";

dotenv.config();

const mongoUri = process.env.MONGO_DB_URL || "";

const startdb = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(mongoUri);
};

const disconnectdb = (cb: () => void) => disconnect(cb);

export { disconnectdb, startdb };
