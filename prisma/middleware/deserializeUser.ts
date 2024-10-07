import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../service/SessionService";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh");
  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublic");

  if (!decoded) {
    res.status(500).send("invalid token");
    return;
  }

  // if (expired && refreshToken) {
  //   const newAccessToken = await reIssueAccessToken(refreshToken);

  //   if (newAccessToken) {
  //     res.setHeader("x-access-token", newAccessToken);
  //   }
  //   const result = verifyJwt(newAccessToken as string, "accessTokenPublic");
  //   res.locals.user = result.decoded;

  //   return next();
  // }
  return next();
};

export default deserializeUser;
