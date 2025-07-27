import { Router } from 'express';

import { login } from '../controllers/auth';
import { createUser } from '../controllers/users';
import { createUserSchema, createLoginSchema } from '../middlewares/validators';
import { AUTH_ROUTES } from '../const';

const authRouter = Router();

authRouter.post(AUTH_ROUTES.SIGNIN, createLoginSchema, login);
authRouter.post(AUTH_ROUTES.SIGNUP, createUserSchema, createUser);

export default authRouter;
