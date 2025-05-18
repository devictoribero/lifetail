import { Global, Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';

/**
 * Global module that provides database connectivity via Prisma ORM
 * This module is imported directly by the AppModule and is marked as global
 * to make the PrismaService available throughout the application
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
