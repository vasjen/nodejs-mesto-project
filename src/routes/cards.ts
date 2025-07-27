import { Router } from 'express';

import {
  getAllCards, createCard, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards';
import { createCardSchema, deleteCardByIdSchema } from '../middlewares/validators';
import { CARD_ROUTES } from '../const';

const cardsRouter = Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCardSchema, createCard);

const cardByIdRouter = Router({ mergeParams: true });

cardByIdRouter.delete('/', deleteCardByIdSchema, deleteCardById);
cardByIdRouter.put(CARD_ROUTES.LIKES, likeCard);
cardByIdRouter.delete(CARD_ROUTES.LIKES, dislikeCard);

cardsRouter.use(CARD_ROUTES.BY_ID, cardByIdRouter);

export default cardsRouter;
