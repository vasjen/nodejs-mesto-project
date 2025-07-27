import mongoose from 'mongoose';

export interface ICard {
  title: string;
  about: string;
  avatar: string;
}

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface IFindByCredentialOptions {
  email: string;
  password: string;
  returnPassword?: boolean;
}

export interface IUserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (_options: IFindByCredentialOptions) => Promise<IUser>;
}
