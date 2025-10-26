import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

// @ts-expect-error bootstrap have no usage but it is required
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
    console.log(
      `🚀 Application is running on: http://${configService.app.host}:${configService.app.port}`,
    );
  }
}
