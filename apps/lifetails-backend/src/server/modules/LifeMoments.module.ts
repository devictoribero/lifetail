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
import { AuthenticationModule } from './Authentication.module';
import { AddLifeMomentMutation } from '../graphql/LifeMoments/add/AddLifeMomentMutation';
import { FindLifeMomentQuery } from 'src/contexts/Lifetails/LifeMoments/application/find/FindLifeMomentQuery';
import { RemoveLifeMomentMutation } from '../graphql/LifeMoments/remove/RemoveLifeMomentMutation';
import { UpdateLifeMomentMutation } from '../graphql/LifeMoments/update/UpdateLifeMomentMutation';
import { SharedModule } from './Shared.module';

@Module({
  imports: [SharedModule, AuthenticationModule],
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
    AddLifeMomentMutation,
    RemoveLifeMomentMutation,
    UpdateLifeMomentMutation,
    FindLifeMomentQuery,
  ],
  exports: [
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    FindLifeMomentQueryHandler,
    AddLifeMomentMutation,
    RemoveLifeMomentMutation,
    UpdateLifeMomentMutation,
    FindLifeMomentQuery,
  ],
})
export class LifeMomentsModule {}
