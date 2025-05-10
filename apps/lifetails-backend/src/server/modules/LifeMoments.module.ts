import { Module } from '@nestjs/common';
// Domain imports
import { LIFE_MOMENT_REPOSITORY } from 'src/contexts/Lifetails/LifeMoments/domain/repositories/LifeMomentRepository';
// Application imports
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommandHandler';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/remove/RemoveLifeMomentCommandHandler';
import { UpdateLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/update/UpdateLifeMomentCommandHandler';
import { FindLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/find/FindLifeMomentQueryHandler';
// Infrastructure imports
import { LifeMomentInMemoryRepository } from 'src/contexts/Lifetails/LifeMoments/infrastructure/LifeMomentInMemoryRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: LIFE_MOMENT_REPOSITORY,
      useClass: LifeMomentInMemoryRepository,
    },
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    FindLifeMomentQueryHandler,
  ],
  exports: [
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    FindLifeMomentQueryHandler,
  ],
})
export class LifeMomentsModule {}
