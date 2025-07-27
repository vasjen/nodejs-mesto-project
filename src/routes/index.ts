import { Router } from 'express';

import usersRouter from './users';
import cardsRouter from './cards';
import { CARD_ROUTES, USER_ROUTES } from '../const';

const router = Router();

router.use(USER_ROUTES.MAIN, usersRouter);
router.use(CARD_ROUTES.MAIN, cardsRouter);

export { default as authRouter } from './auth';
export default router;
