import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';

import { CustomError } from '../helpers/error-constructor';
import cardModel from '../models/card';

export const getAllCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await cardModel.find({});

    res.send(cards);
  } catch (error: any) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  const userId = req.user?._id;

  try {
    const createdCard = await cardModel.create({
      name,
      link,
      owner: userId,
    });

    res.status(constants.HTTP_STATUS_CREATED).send(createdCard);
  } catch (error: any) {
    if (error instanceof MongooseError.ValidationError) {
      next(new CustomError(constants.HTTP_STATUS_BAD_REQUEST, 'Переданы некорректные данные при создании карточки'));
      return;
    }

    next(error);
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCard = await cardModel.findByIdAndDelete(req.params.cardId);

    if (!deletedCard) {
      throw new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Карточка с указанным _id не найдена');
    }

    res.send(deletedCard);
  } catch (error: any) {
    if (error instanceof MongooseError.CastError) {
      next(new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Карточка с указанным _id не найдена'));
      return;
    }

    next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  try {
    const updatedCard = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      throw new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Карточка с указанным _id не найдена');
    }

    res.send(updatedCard);
  } catch (error: any) {
    if (error instanceof MongooseError.CastError) {
      next(new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Карточка с указанным _id не найдена'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new CustomError(constants.HTTP_STATUS_BAD_REQUEST, 'Переданы некорректные данные для постановки/снятии лайка'));
      return;
    }

    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  try {
    const updatedCard = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      throw new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Карточка с указанным _id не найдена');
    }

    res.send(updatedCard);
  } catch (error: any) {
    if (error instanceof MongooseError.CastError) {
      next(new CustomError(constants.HTTP_STATUS_NOT_FOUND, 'Карточка с указанным _id не найдена'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new CustomError(constants.HTTP_STATUS_BAD_REQUEST, 'Переданы некорректные данные для постановки/снятии лайка'));
      return;
    }

    next(error);
  }
};
