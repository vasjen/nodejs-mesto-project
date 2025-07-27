import mongoose from 'mongoose';
import { isEmail, isURL } from 'validator';
import bcrypt from 'bcryptjs';

import { IUser, IUserModel, IFindByCredentialOptions } from '../types';
import { UnauthorizedError } from '../helpers';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url: string) => isURL(url),
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email: string) => isEmail(email),
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.static('findUserByCredentials', async function findUserByCredentials(options: IFindByCredentialOptions) {
  const { email, password, returnPassword } = options;

  let user: IUser;
  if (returnPassword) {
    user = await this.findOne({ email }).select('+password');
  } else {
    user = await this.findOne({ email });
  }

  if (!user) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  return user;
});

export default mongoose.model<IUser, IUserModel>('user', userSchema);
