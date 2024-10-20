import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt';
import { reIssueAccessToken } from '../service/SessionService';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    '',
  );

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublic');

  if (decoded) {
    res.locals.user = decoded;
  }
  const refreshToken = get(req, 'headers.x-refresh') as string;

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken as string);
    }
    const result = verifyJwt(newAccessToken as string, 'accessTokenPublic');
    res.locals.user = result.decoded;

    return next();
  }
  return next();
};

export default deserializeUser;
