import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../helpers';
import { JWT_SECRET_KEY } from '../const';

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload as { _id: string };

  next();
};
