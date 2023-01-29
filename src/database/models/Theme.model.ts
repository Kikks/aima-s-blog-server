import mongoose, { Schema } from "mongoose";

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Theme = mongoose.model("Theme", ThemeSchema);

export default Theme;
