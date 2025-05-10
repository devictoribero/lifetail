import { Module } from '@nestjs/common';
// Domain imports
import {
  LifeMomentRepository,
  LifeMomentRepositorySymbol,
} from 'src/contexts/Lifetails/LifeMoments/domain/repositories/LifeMomentRepository';
// Application imports
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommandHandler';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/remove/RemoveLifeMomentCommandHandler';
import { UpdateLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/update/UpdateLifeMomentCommandHandler';
import { FindLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/find/FindLifeMomentQueryHandler';
// Infrastructure imports
import { LifeMomentInMemoryRepository } from 'src/contexts/Lifetails/LifeMoments/infrastructure/LifeMomentInMemoryRepository';

const lifeMomentRepositoryProvider = {
  provide: LifeMomentRepositorySymbol,
  useClass: LifeMomentInMemoryRepository,
};

const addLifeMomentCommandHandlerProvider = {
  provide: AddLifeMomentCommandHandler,
  useFactory: (repository: LifeMomentRepository) => {
    return new AddLifeMomentCommandHandler(repository);
  },
  inject: [LifeMomentRepositorySymbol],
};

const removeLifeMomentCommandHandlerProvider = {
  provide: RemoveLifeMomentCommandHandler,
  useFactory: (repository: LifeMomentRepository) => {
    return new RemoveLifeMomentCommandHandler(repository);
  },
  inject: [LifeMomentRepositorySymbol],
};

const updateLifeMomentCommandHandlerProvider = {
  provide: UpdateLifeMomentCommandHandler,
  useFactory: (repository: LifeMomentRepository) => {
    return new UpdateLifeMomentCommandHandler(repository);
  },
  inject: [LifeMomentRepositorySymbol],
};

const FindLifeMomentQueryHandlerProvider = {
  provide: FindLifeMomentQueryHandler,
  useFactory: (repository: LifeMomentRepository) => {
    return new FindLifeMomentQueryHandler(repository);
  },
  inject: [LifeMomentRepositorySymbol],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    lifeMomentRepositoryProvider,
    addLifeMomentCommandHandlerProvider,
    removeLifeMomentCommandHandlerProvider,
    updateLifeMomentCommandHandlerProvider,
    FindLifeMomentQueryHandlerProvider,
  ],
  exports: [
    LifeMomentRepositorySymbol,
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    FindLifeMomentQueryHandler,
  ],
})
export class LifeMomentsModule {}
