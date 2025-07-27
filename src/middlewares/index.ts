import express from 'express';

export { errorHandler } from './error-handler';
export { pageNotFoundHandler } from './page-not-found-handler';
export { authHandler } from './auth-handler';
export * from './logger';

export const parseRequest = [
  express.json(),
  express.urlencoded({ extended: true }),
];
