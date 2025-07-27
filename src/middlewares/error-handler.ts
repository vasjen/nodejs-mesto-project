import { ErrorRequestHandler } from 'express';
import { constants } from 'http2';

import { DEFAULT_ERROR_MESSAGE } from '../const';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const code = error.code ?? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = error.message ?? DEFAULT_ERROR_MESSAGE;

  res.status(code).send({ message });
};
