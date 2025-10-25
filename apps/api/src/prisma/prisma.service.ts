import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DatabaseService } from '@track-my-money/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = DatabaseService.getInstance();
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
