import { Request, Response } from "express";
import { validateUser } from "../service/UserService";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/SessionService";
import { signJwt } from "../utils/jwt";
import config from "config";

export async function CreateSessionHandler(req: Request, res: Response) {
  try {
    const user = await validateUser(req.body);

    if (!user) {
      return res.status(400).send(`user not found`);
    }

    const userAgent = req.get("userAgent") || "";
    const session = await createSession({
      user: user.username,
      userAgent: userAgent,
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
    console.log(res.locals);

    return res.status(200).send({
      session,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
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
    const username = res.locals.user.username;
    const session = await findSession({ user: username, valid: true });
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
    const username = res.locals.user.username;
    const user = await updateSession(username, { valid: false });
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
