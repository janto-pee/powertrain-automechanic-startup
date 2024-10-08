import { Request, Response } from "express";
import { validateUser } from "../service/UserService";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/SessionService";
import { signJwt } from "../utils/jwt";
import config from "config";
import { createSessionInput } from "../schema/SessionSchema";

export async function CreateSessionHandler(
  req: Request<{}, {}, createSessionInput["body"]>,
  res: Response
) {
  try {
    const { email, hashed_password } = req.body;
    const user = await validateUser(email, hashed_password);
    console.log(user);

    if (!user) {
      res.status(400).send(`user not found`);
      return;
    }

    const userAgent = req.get("userAgent") || "";
    const session = await createSession({
      userId: user.id,
      userAgent: userAgent,
      valid: true,
    });

    //   generate access and refresh token
    const accessToken = signJwt(
      { ...user, session: session.id },
      "accessTokenPrivate",
      { expiresIn: config.get<string>("accessTokenTtl") }
    );

    const refreshToken = signJwt(
      { ...user, session: session.id },
      "refreshTokenPrivate",
      { expiresIn: config.get<string>("refreshTokenTtl") }
    );

    res.status(200).send({
      session,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function findSessionHandler(req: Request, res: Response) {
  try {
    const id = res.locals.user.session;
    const session = await findSession(id);
    res.status(201).json({
      status: true,
      message: "session found",
      data: session,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  try {
    const id = res.locals.user.id;
    const user = await updateSession(id);
    res.status(201).json({
      status: true,
      message: "session expired",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}
