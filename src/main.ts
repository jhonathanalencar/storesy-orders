import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';
import { ErrorExceptionFilter } from './exception-filters/error.exception-filter';
import { BadRequestError } from './errors/bad-request.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new ErrorExceptionFilter(httpAdapter),
    new PrismaExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const firstErrorMessage = Object.values(errors[0].constraints)[0];
        return new BadRequestError(firstErrorMessage);
      },
    }),
  );
  await app.listen(4000);
}
bootstrap();
