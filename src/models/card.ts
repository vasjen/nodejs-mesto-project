import mongoose from 'mongoose';
import { isURL } from 'validator';

import { ICard } from '../types';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => isURL(url),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model<ICard>('card', cardSchema);
