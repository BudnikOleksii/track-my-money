import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { DatabaseService } from '@track-my-money/database';

import { AppConfigService } from '../config';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private databaseService: DatabaseService;

  constructor(private configService: AppConfigService) {
    const databaseUrl = this.configService.database.url;
    this.databaseService = DatabaseService.getInstance(databaseUrl);
  }

  get client() {
    return this.databaseService.client;
  }

  async onModuleInit() {
    await this.databaseService.connect();
  }

  async onModuleDestroy() {
    await this.databaseService.disconnect();
  }
}
