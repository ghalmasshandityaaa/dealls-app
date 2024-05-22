import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import {
  CommandHandlerNotFoundExceptionFilter,
  JoiSchemaExceptionFilter,
  NotFoundExceptionFilter,
  PayloadTooLargeExceptionFilter,
  QueryHandlerNotFoundExceptionFilter,
  UnhandledExceptionFilter,
} from './common/filters';
import { JoiSchemaValidationPipe } from './common/pipes';
import { ServerConfigService } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get(ServerConfigService);
  const logger = app.get(Logger);

  app.useLogger(logger);
  app
    .enableShutdownHooks()
    .use(json({ limit: '5mb' }))
    .setGlobalPrefix('v1')
    .use(
      helmet({
        contentSecurityPolicy: true,
        hidePoweredBy: true,
      }),
    )
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
      new JoiSchemaValidationPipe(),
    )
    .useGlobalFilters(
      new JoiSchemaExceptionFilter(),
      new UnhandledExceptionFilter(),
      new NotFoundExceptionFilter(),
      new PayloadTooLargeExceptionFilter(),
      new QueryHandlerNotFoundExceptionFilter(),
      new CommandHandlerNotFoundExceptionFilter(),
    )
    .enableCors({
      origin: config.cors.origin,
      credentials: config.cors.credentials,
    });

  await app.listen(config.port || 3000, () => {
    logger.log(`API service running on port ${config.port}...`);
  });
}
bootstrap();
