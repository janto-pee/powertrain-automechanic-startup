import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod/lib";

const validateResource =
  (Schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({ body: req.body, params: req.params, query: req.query });
    } catch (error: any) {
      res.status(500).send(error.message);
      return;
    }
    return next();
  };

export default validateResource;
