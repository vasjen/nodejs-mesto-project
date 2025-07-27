import { Router } from 'express';

import {
  getAllCards, createCard, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);

const cardByIdRouter = Router({ mergeParams: true });

cardByIdRouter.delete('/', deleteCardById);
cardByIdRouter.put('/likes', likeCard);
cardByIdRouter.delete('/likes', dislikeCard);

cardsRouter.use('/:cardId', cardByIdRouter);

export default cardsRouter;
