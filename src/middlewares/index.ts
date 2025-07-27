import express from 'express';

export { setUserId } from './set-user-id';
export { errorHandler } from './error-handler';
export { pageNotFoundHandler } from './page-not-found-handler';

export const parseRequest = [
  express.json(),
  express.urlencoded({ extended: true }),
];
