import { Module } from '@nestjs/common';
import { VeterinaryModule } from './modules/veterinary.module';

@Module({
  imports: [VeterinaryModule],
})
export class AppModule {}
