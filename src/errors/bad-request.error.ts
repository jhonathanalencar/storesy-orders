import { HttpStatus } from '@nestjs/common';

import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = HttpStatus.BAD_REQUEST;
  }
}
