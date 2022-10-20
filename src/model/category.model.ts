import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 8);

export interface CategoryInput {
  name: string;
  color: string;
  icon: string;
  image: string;
}
export interface CategoryDocument extends CategoryInput, mongoose.Document {
  user: UserDocument["_id"];
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category-${nanoid()}`,
    },
    name: { type: String, required: true },
    color: { type: String },
    icon: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  CategorySchema
);
export default CategoryModel;
