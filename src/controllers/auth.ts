import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import userModel from '../models/user';
import { JWT_SECRET_KEY } from '../const';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByCredentials({
      email,
      password,
      returnPassword: true,
    });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });

    res.send({ token });
  } catch (error) {
    next(error);
  }
};
