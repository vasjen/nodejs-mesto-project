import { NextFunction, Request, Response } from 'express';

import { NotFoundError } from '../helpers';

export const pageNotFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
};
