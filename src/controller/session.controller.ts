import { Request, Response } from "express";
import {
  createSession,
  findSession,
  updateSession,
} from "../services/session.service";
import { validateUser } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  // validate User Existence
  const body = req.body;
  const user = await validateUser({ ...body });

  if (!user) {
    return res.status(400).send(`user not found`);
  }

  const userAgent = req.get("userAgent") || "";
  const session = await createSession({ user: user._id, userAgent: userAgent });

  //   generate access and refresh token
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivate",
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivate",
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );
  console.log(res.locals);

  return res.status(200).send({
    session,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

export async function findSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const session = await findSession({ user: userId, valid: true });
    return res.status(200).send(session);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function updateSessionHandler(req: Request, res: Response) {
  const update = req.body;
  const sessionId = res.locals.user.session;
  try {
    const updatedSession = await updateSession(
      { _id: sessionId },
      { valid: false }
    );
    res.status(200).send({ accessToken: null, refreshToken: null });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
