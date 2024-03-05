import { HttpStatus } from '@nestjs/common';

import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = HttpStatus.NOT_FOUND;
  }
}
