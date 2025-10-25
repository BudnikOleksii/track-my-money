import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(AppConfigService);
  
  app.enableCors();
  
  await app.listen(configService.app.port, configService.app.host);
  
  console.log(`🚀 Application is running on: http://${configService.app.host}:${configService.app.port}`);
}
