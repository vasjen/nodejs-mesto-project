import { constants } from 'http2';

export class ForbiddenError extends Error {
  readonly code: number;

  constructor(message: string) {
    super(message);

    this.code = constants.HTTP_STATUS_FORBIDDEN;
  }
}
