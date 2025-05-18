import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.$on('error', (event) => {
      this.logger.error(`Prisma Error: ${event.message}`);
    });

    this.$on('warn', (event) => {
      this.logger.warn(`Prisma Warning: ${event.message}`);
    });

    if (process.env.NODE_ENV === 'development') {
      this.$on('query', (event) => {
        this.logger.debug(`Query: ${event.query}`);
        this.logger.debug(`Duration: ${event.duration}ms`);
      });
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      this.logger.error(`Failed to connect to the database: ${error.message}`);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from the database');
    } catch (error) {
      this.logger.error(`Error disconnecting from the database: ${error.message}`);
      throw error;
    }
  }
}
