import { Module } from '@nestjs/common';
// Domain imports
import {
  PetLifeMomentRepository,
  PetLifeMomentRepositorySymbol,
} from 'src/contexts/Lifetails/PetLifeMoments/domain/repositories/PetLifeMomentRepository';
// Application imports
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { RemovePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommandHandler';
import { UpdatePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentCommandHandler';
import { FindPetLifeMomentQueryHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/find/FindPetLifeMomentQueryHandler';
// Infrastructure imports
import { PetLifeMomentInMemoryRepository } from 'src/contexts/Lifetails/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';

const petLifeMomentRepositoryProvider = {
  provide: PetLifeMomentRepositorySymbol,
  useClass: PetLifeMomentInMemoryRepository,
};

const addPetLifeMomentCommandHandlerProvider = {
  provide: AddPetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new AddPetLifeMomentCommandHandler(repository);
  },
  inject: [PetLifeMomentRepositorySymbol],
};

const removePetLifeMomentCommandHandlerProvider = {
  provide: RemovePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new RemovePetLifeMomentCommandHandler(repository);
  },
  inject: [PetLifeMomentRepositorySymbol],
};

const updatePetLifeMomentCommandHandlerProvider = {
  provide: UpdatePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new UpdatePetLifeMomentCommandHandler(repository);
  },
  inject: [PetLifeMomentRepositorySymbol],
};

const FindPetLifeMomentQueryHandlerProvider = {
  provide: FindPetLifeMomentQueryHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new FindPetLifeMomentQueryHandler(repository);
  },
  inject: [PetLifeMomentRepositorySymbol],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    petLifeMomentRepositoryProvider,
    addPetLifeMomentCommandHandlerProvider,
    removePetLifeMomentCommandHandlerProvider,
    updatePetLifeMomentCommandHandlerProvider,
    FindPetLifeMomentQueryHandlerProvider,
  ],
  exports: [
    PetLifeMomentRepositorySymbol,
    AddPetLifeMomentCommandHandler,
    RemovePetLifeMomentCommandHandler,
    UpdatePetLifeMomentCommandHandler,
    FindPetLifeMomentQueryHandler,
  ],
})
export class PetLifeMomentsModule {}
