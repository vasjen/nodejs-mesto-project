import { Request, Response, NextFunction } from 'express';

export const setUserId = (req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '685322ec3ae8ebf624cf57ba',
  };

  next();
};
