import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';

import { BadRequestError, NotFoundError, ForbiddenError } from '../helpers';
import cardModel from '../models/card';
import { CARD_ID_PARAM } from '../const';

export const getAllCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await cardModel.find({});

    res.send(cards);
  } catch (error) {
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
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      return;
    }

    next(error);
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const cardId = req.params[CARD_ID_PARAM];

  try {
    const isCardExist = await cardModel.exists({ _id: cardId });
    if (!isCardExist) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    const deletedCard = await cardModel.findOneAndDelete({
      _id: cardId,
      owner: userId,
    });

    if (!deletedCard) {
      throw new ForbiddenError('Невозможно удалить чужую карточку');
    }

    res.send(deletedCard);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
      return;
    }

    next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  try {
    const updatedCard = await cardModel.findByIdAndUpdate(
      req.params[CARD_ID_PARAM],
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      return;
    }

    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  try {
    const updatedCard = await cardModel.findByIdAndUpdate(
      req.params[CARD_ID_PARAM],
      { $pull: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      return;
    }

    next(error);
  }
};
