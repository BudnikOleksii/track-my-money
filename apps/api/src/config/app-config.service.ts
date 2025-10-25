import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration.schema';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<Configuration>) {}

  get app() {
    return this.configService.get('app', { infer: true })!;
  }

  get database() {
    return this.configService.get('database', { infer: true })!;
  }

  get isDevelopment() {
    return this.app.nodeEnv === 'development';
  }

  get isProduction() {
    return this.app.nodeEnv === 'production';
  }

  get isTest() {
    return this.app.nodeEnv === 'test';
  }
}
