import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: true,
  });

  await app.listen(configService.app.port, configService.app.host);

  if (!configService.isProduction) {
    console.warn(
      `🚀 Application is running on: http://${configService.app.host}:${configService.app.port}`,
    );
  }
}

void bootstrap();
