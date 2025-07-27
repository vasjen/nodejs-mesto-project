import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';

import { CustomError } from '../helpers/error-constructor';
import userModel from '../models/user';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find({});

    res.send(users);
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) {
      throw new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Пользователь по указанному _id не найден');
    }

    res.send(user);
  } catch (error: any) {
    if (error instanceof MongooseError.CastError) {
      next(new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Пользователь по указанному _id не найден'));
      return;
    }

    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  try {
    const createdUser = await userModel.create({
      name,
      about,
      avatar,
    });

    res.status(constants.HTTP_STATUS_CREATED).send(createdUser);
  } catch (error: any) {
    if (error instanceof MongooseError.ValidationError) {
      next(new CustomError(constants.HTTP_STATUS_BAD_REQUEST, 'Переданы некорректные данные при создании пользователя'));
      return;
    }

    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      name,
      about,
    }, { new: true, runValidators: true });

    if (!updatedUser) {
      throw new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Пользователь по указанному _id не найден');
    }

    res.send(updatedUser);
  } catch (error: any) {
    if (error instanceof MongooseError.CastError) {
      next(new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Пользователь по указанному _id не найден'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new CustomError(constants.HTTP_STATUS_BAD_REQUEST, 'Переданы некорректные данные при обновлении профиля'));
      return;
    }

    next(error);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      avatar,
    }, { new: true, runValidators: true });

    if (!updatedUser) {
      throw new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Пользователь по указанному _id не найден');
    }

    res.send(updatedUser);
  } catch (error: any) {
    if (error instanceof MongooseError.CastError) {
      next(new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Пользователь по указанному _id не найден'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new CustomError(constants.HTTP_STATUS_BAD_REQUEST, 'Переданы некорректные данные при обновлении профиля'));
      return;
    }

    next(error);
  }
};
