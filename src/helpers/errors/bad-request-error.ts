import { constants } from 'http2';

export class BadRequestError extends Error {
  readonly code: number;

  constructor(message: string) {
    super(message);

    this.code = constants.HTTP_STATUS_BAD_REQUEST;
  }
}
