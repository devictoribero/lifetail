import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port).then(() => {
    console.info(`LifeTail API is running on port ${port}`);
  });
}
bootstrap();
