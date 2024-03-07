import type { Response } from 'express';
import { type ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ZodError } from 'zod';

import { CustomError } from '../errors/custom-error';

@Catch(Error)
export class ErrorExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    if (exception instanceof CustomError) {
      status = exception.status;
      message = exception.message;
    }
    if (exception instanceof ZodError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.errors[0].message;
    }
    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
