import { ErrorRequestHandler } from 'express';
import { constants } from 'http2';

import { DEFAULT_ERROR_MESSAGE } from '../const/errors';
import { CustomError } from '../helpers/error-constructor';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    res.status(error.code).send({ message: error.message });
  } else {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};
