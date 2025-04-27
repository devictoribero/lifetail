import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port).then(() => {
    console.info(`LifeTail API is running on port ${port}`);
  });
}
bootstrap();
