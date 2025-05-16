import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/App.module';
import { seedDatabase } from './scripts/seed-db';
import { GraphQLExceptionFilter } from './graphql/Shared/filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global filters to map domain exceptions to GraphQL errors
  app.useGlobalFilters(new GraphQLExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port).then(async () => {
    console.info(`LifeTail API is running on port ${port}`);
    await seedDatabase(app);
  });
}

bootstrap();
