import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS with credentials
  app.enableCors({
    credentials: true,
    origin: true,
  });

  await app.listen(configService.app.port, configService.app.host);

  console.log(
    `🚀 Application is running on: http://${configService.app.host}:${configService.app.port}`,
  );
}
