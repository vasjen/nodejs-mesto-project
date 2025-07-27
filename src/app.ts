import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import router, { authRouter } from './routes';
import {
  parseRequest,
  errorHandler,
  pageNotFoundHandler,
  authHandler,
  requestLogger,
  errorLogger,
} from './middlewares';

const app = express();

app.use(parseRequest);

app.use(requestLogger);

app.use('/', authRouter);
app.use(authHandler);

app.use('/', router);

app.use(pageNotFoundHandler);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const connect = () => {
  mongoose.connect(MONGO_URL);
  app.listen(PORT);
};

connect();
