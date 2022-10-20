import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory,
} from "../services/category.service";

/**
 *
 * ALL CATEGORY CONTROLLER are contained here
 *
 */

export async function createCategoryHandler(req: Request, res: Response) {
  try {
    const input = req.body;
    const category = await createCategory({ ...input });
    res.status(200).send(category);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
export async function findCategoriesHandler(req: Request, res: Response) {
  try {
    const categories = await findCategories();
    res.status(200).send(categories);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
export async function findCategoryHandler(req: Request, res: Response) {
  try {
    const categoryId = req.params.categoryId;
    const category = await findCategory({ categoryId });

    if (!category) {
      return res.status(500).send(`unable to get category`);
    }

    res.status(200).send(category);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
export async function updateCategoryHandler(req: Request, res: Response) {
  try {
    const categoryId = req.params.categoryId;
    const update = req.body;

    const updatedcategory = await updateCategory(
      { categoryId },
      { update },
      { new: true }
    );
    res.status(200).send(updatedcategory);
  } catch (error: any) {
    res.status(200).send(error.message);
  }
}
export async function deleteCategoryHandler(req: Request, res: Response) {
  try {
    const categoryId = req.params.categoryId;
    await deleteCategory({ categoryId });
    res.status(200).send(`product deleted`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
