import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  updateProduct,
} from "../services/product.service";

export async function createProductHandler(req: Request, res: Response) {
  try {
    const input = req.body;
    const product = await createProduct({ ...input });
    res.status(200).send(product);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function findProductsHandler(req: Request, res: Response) {
  try {
    const products = await findProducts();
    res.status(200).send(products);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function findProductHandler(req: Request, res: Response) {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      return res.status(500).send(`unable to get product`);
    }

    res.status(200).send(product);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  try {
    const productId = req.params.productId;
    const update = req.body;

    const updatedProduct = await updateProduct(
      { productId },
      { update },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error: any) {
    res.status(200).send(error.message);
  }
}

export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const productId = req.params.productId;
    await deleteProduct({ productId });
    res.status(200).send(`product deleted`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
