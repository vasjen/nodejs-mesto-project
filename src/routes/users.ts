import { Router } from 'express';

import {
  getAllUsers, createUser, getUserById, updateProfile, updateAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

const profileRouter = Router();

profileRouter.patch('/', updateProfile);
profileRouter.patch('/avatar', updateAvatar);

usersRouter.use('/me', profileRouter);

export default usersRouter;
