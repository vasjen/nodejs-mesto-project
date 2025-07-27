import { celebrate, Joi } from 'celebrate';

export const getUserByIdSchema = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

export const createUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const updateProfileSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const updateAvatarSchema = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});
