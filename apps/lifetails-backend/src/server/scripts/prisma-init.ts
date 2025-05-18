import { INestApplication, Logger } from '@nestjs/common';
import { PrismaService } from '../../contexts/Shared/infrastructure/prisma/PrismaService';

/**
 * Initializes Prisma and handles database connection issues
 */
export async function initializePrisma(app: INestApplication): Promise<void> {
  const logger = new Logger('PrismaInit');

  try {
    const prismaService = app.get(PrismaService);

    // Add shutdown hooks for proper cleanup
    prismaService.$on('beforeExit', async () => {
      logger.log('Prisma is shutting down');
      await app.close();
    });

    logger.log('Prisma successfully initialized');
  } catch (error) {
    logger.error(`Failed to initialize Prisma: ${error.message}`);
    throw error;
  }
}
