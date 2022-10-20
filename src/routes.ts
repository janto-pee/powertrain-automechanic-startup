import { Express, Request, Response } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  findCategoriesHandler,
  findCategoryHandler,
  updateCategoryHandler,
} from "./controller/category.controller";
import {
  createProductHandler,
  deleteProductHandler,
  findProductHandler,
  findProductsHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createSessionHandler,
  findSessionHandler,
  updateSessionHandler,
} from "./controller/session.controller";
import {
  createUserHandler,
  findAllUsersHandler,
  findUserHandler,
} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validate";
import createUserSchema from "./schema/user.schema";

export async function routes(app: Express) {
  app.get("/test", (req: Request, res: Response) => {
    res.status(200).send("You are on the test route");
  });

  /**
   *
   * USER ROUTE
   *
   */

  app.post("/api/users", validate(createUserSchema), createUserHandler);
  // get a user
  app.get("/api/users/:userId", requireUser, findUserHandler);
  // find all users
  app.get("/api/users", requireUser, findAllUsersHandler),
    /**
     *
     * SESSION ROUTES
     *
     */

    app.post("/api/sessions", createSessionHandler);
  app.get("/api/sessions", requireUser, findSessionHandler);
  app.put("/api/sessions", requireUser, updateSessionHandler);

  /**
   *
   * CATEGORY ROUTES
   *
   */

  app.post("/api/v1/category", createCategoryHandler);
  app.get("/api/v1/category:categoryId", findCategoryHandler);
  app.get("/api/v1/category", findCategoriesHandler);
  app.put("/api/v1/category/:categoryId", updateCategoryHandler);
  app.delete("/api/v1/category/:categoryId", deleteCategoryHandler);

  /**
   *
   * Product Route
   *
   */

  app.post("/api/v1/products", createProductHandler);
  app.get("/api/v1/products/:productId", findProductHandler);
  app.get("/api/v1/products", findProductsHandler);
  app.put("/api/v1/products/:productId", updateProductHandler);
  app.delete("/api/v1/products/:productId", deleteProductHandler);
}
