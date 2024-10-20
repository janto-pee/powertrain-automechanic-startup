import { NextFunction, Request, Response } from 'express';

const requireUser = (_: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    res.status(400).send('user not authorized');
    return;
  }
  return next();
};
export default requireUser;
