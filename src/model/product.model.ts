import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 8);

export interface ProductInput {
  title: string;
  description: string;
  images: string;
  brand: string;
  price: number;
  countInStock: number;
  rating: number;
  isFeatured: boolean;
}
export interface ProductDocument extends ProductInput, mongoose.Document {
  category: CategoryDocument["_id"];
  user: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product-${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    isFeatured: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;
