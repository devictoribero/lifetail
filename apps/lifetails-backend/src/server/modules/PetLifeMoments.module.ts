import { Module } from '@nestjs/common';
// Domain imports
import { PetLifeMomentRepository } from 'src/contexts/Lifetails/PetLifeMoments/domain/repositories/PetLifeMomentRepository';
// Application imports
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { RemovePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommandHandler';
import { UpdatePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentCommandHandler';
import { FindPetLifeMomentQueryHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/find/FindPetLifeMomentQueryHandler';
// Infrastructure imports
import { PetLifeMomentInMemoryRepository } from 'src/contexts/Lifetails/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';

const petLifeMomentRepositoryProvider = {
  provide: 'PetLifeMomentRepository',
  useClass: PetLifeMomentInMemoryRepository,
};

const addPetLifeMomentUseCaseProvider = {
  provide: AddPetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new AddPetLifeMomentCommandHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

const removePetLifeMomentUseCaseProvider = {
  provide: RemovePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new RemovePetLifeMomentCommandHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

const updatePetLifeMomentUseCaseProvider = {
  provide: UpdatePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new UpdatePetLifeMomentCommandHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

const FindPetLifeMomentQueryHandlerProvider = {
  provide: FindPetLifeMomentQueryHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new FindPetLifeMomentQueryHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    petLifeMomentRepositoryProvider,
    addPetLifeMomentUseCaseProvider,
    removePetLifeMomentUseCaseProvider,
    updatePetLifeMomentUseCaseProvider,
    FindPetLifeMomentQueryHandlerProvider,
  ],
  exports: [
    'PetLifeMomentRepository',
    AddPetLifeMomentCommandHandler,
    RemovePetLifeMomentCommandHandler,
    UpdatePetLifeMomentCommandHandler,
    FindPetLifeMomentQueryHandler,
  ],
})
export class PetLifeMomentsModule {}
