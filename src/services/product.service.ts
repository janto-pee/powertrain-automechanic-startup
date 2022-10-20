import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../model/product.model";

export async function createProduct(input: ProductInput) {
  const Product = await ProductModel.create(input);
  return Product;
}

export async function findProducts() {
  const Product = await ProductModel.find();
  return Product;
}

export async function findProduct(query: FilterQuery<ProductDocument>) {
  const Product = await ProductModel.findOne(query);
  return Product;
}
export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options?: QueryOptions
) {
  return ProductModel.updateOne(query, update, options);
}
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}

/*----------  Get Featured Products  ----------*/

export async function getFeaturedProducts(query: FilterQuery<ProductDocument>) {
  const Product = await ProductModel.find(query);
  return Product;
}

/*----------  Get Product Brand  ----------*/

export async function getProductBrand(query: FilterQuery<ProductDocument>) {
  const Product = await ProductModel.find(query);
  return Product;
}
/*----------  Get Product Seller  ----------*/

export async function getProductSeller(query: FilterQuery<ProductDocument>) {
  const Product = await ProductModel.find(query);
  return Product;
}
/*----------  Get Popular Product  ----------*/

export async function getSellerRanking(query: FilterQuery<ProductDocument>) {
  const Product = await ProductModel.find(query);
  return Product;
}
