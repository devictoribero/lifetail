import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/App.module';
import { seedDatabase } from './scripts/seed-db';
import { GraphQLExceptionFilter } from './graphql/Shared/filters/graphql-exception.filter';
import { initializePrisma } from './scripts/prisma-init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global filters to map domain exceptions to GraphQL errors
  app.useGlobalFilters(new GraphQLExceptionFilter());

  // Initialize Prisma
  await initializePrisma(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port).then(async () => {
    console.info(`LifeTail API is running on port ${port}`);
    await seedDatabase(app);
  });
}

bootstrap();
