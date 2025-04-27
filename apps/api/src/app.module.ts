import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetLifeMomentsModule } from './PetLifeMoments/infrastructure/infrastructure/PetLifeMoments.module';

@Module({
  imports: [PetLifeMomentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}