import { Express, Request, Response } from "express";
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

  //   Create User Route
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  // find all users
  app.get("/api/users", requireUser, findAllUsersHandler),
    // get a user
    app.get("/api/users/:userId", requireUser, findUserHandler);

  // Sessions
  // create sessions
  app.post("/api/sessions", createSessionHandler);
  app.get("/api/sessions", requireUser, findSessionHandler);
  app.put("/api/sessions", requireUser, updateSessionHandler);
}
