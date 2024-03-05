import type { Response } from 'express';
import { type ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { CustomError } from '../errors/custom-error';

@Catch(Error)
export class ErrorExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500;
    let message = 'Internal server error';
    if (exception instanceof CustomError) {
      status = exception.status;
      message = exception.message;
    }
    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
