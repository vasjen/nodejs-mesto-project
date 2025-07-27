import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';
import bcrypt from 'bcryptjs';

import { NotFoundError, BadRequestError, ConflictError } from '../helpers';
import userModel from '../models/user';
import { USER_ID_PARAM } from '../const';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find({}).select('-password');

    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findById(req.params[USER_ID_PARAM]).select('-password');

    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }

    res.send(user);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new NotFoundError('Пользователь по указанному _id не найден'));
      return;
    }

    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });

    // Получаем созданного пользователя без пароля
    const userWithoutPassword = await userModel.findById(createdUser._id).select('-password');

    res.status(constants.HTTP_STATUS_CREATED).send(userWithoutPassword);
  } catch (error: any) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }

    if (error.code === 11000) {
      next(new ConflictError('Пользователь с указанным email уже существует'));
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
    }, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }

    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new NotFoundError('Пользователь по указанному _id не найден'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
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
    }, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }

    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new NotFoundError('Пользователь по указанному _id не найден'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      return;
    }

    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  try {
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
};
