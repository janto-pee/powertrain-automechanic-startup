import { Request, Response } from "express";
import { createUserInput } from "../schema/user.schema";
import { createUser, findAllUser, findUser } from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const body = req.body;

    // const password = req.body.password;
    // const confirm_password = req.body.confirm_Password;
    // if (!confirm_password) {
    //   return res.status(400).send("confirm_password empty");
    // }

    // if (password !== confirm_password) {
    //   return res.status(400).send("password mismatch");
    // }
    const user = await createUser({ ...body });
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
export async function findAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await findAllUser();

    if (!users) {
      return res.status(404).send("user not found");
    }

    return res.status(200).send(users);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
export async function findUserHandler(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const user = await findUser({ userId });

    if (!user) {
      return res.status(404).send("user not found");
    }

    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
