import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';
import { ErrorExceptionFilter } from './exception-filters/error.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new ErrorExceptionFilter(httpAdapter),
    new PrismaExceptionFilter(),
  );
  await app.listen(4000);
}
bootstrap();
