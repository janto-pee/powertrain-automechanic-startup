import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, {
  CategoryDocument,
  CategoryInput,
} from "../model/category.model";

export async function createCategory(input: CategoryInput) {
  const category = await CategoryModel.create(input);
  return category;
}
export async function findCategories() {
  const category = await CategoryModel.find();
  return category;
}
export async function findCategory(query: FilterQuery<CategoryDocument>) {
  const category = await CategoryModel.findOne(query);
  return category;
}
export async function updateCategory(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return CategoryModel.updateOne(query, update, options);
}
export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}
