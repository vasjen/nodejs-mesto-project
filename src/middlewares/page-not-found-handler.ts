import { Request, Response } from 'express';
import { constants } from 'http2';

export const pageNotFoundHandler = (_req: Request, res: Response) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
};
