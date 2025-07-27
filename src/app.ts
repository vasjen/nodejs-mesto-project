import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import router from './routes';
import {
  parseRequest,
  setUserId,
  errorHandler,
  pageNotFoundHandler,
} from './middlewares';

const app = express();

app.use(parseRequest, setUserId);
app.use('/', router);
app.use(errorHandler);
app.use(pageNotFoundHandler);

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env

const connect = () => {
  mongoose.connect(MONGO_URL);
  app.listen(PORT);
};

connect();
