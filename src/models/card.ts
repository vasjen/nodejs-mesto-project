import mongoose from 'mongoose';

interface ICard {
  title: string;
  about: string;
  avatar: string;
}

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
