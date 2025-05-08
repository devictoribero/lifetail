import { Module } from '@nestjs/common';
// Application imports
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { RemovePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommandHandler';
import { UpdatePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentCommandHandler';
import { FindPetLifeMomentUseCase } from 'src/contexts/Lifetails/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
// Infrastructure imports
import { PetLifeMomentInMemoryRepository } from 'src/contexts/Lifetails/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';

const petLifeMomentRepositoryProvider = {
  provide: PetLifeMomentInMemoryRepository,
  useClass: PetLifeMomentInMemoryRepository,
};

const addPetLifeMomentUseCaseProvider = {
  provide: AddPetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new AddPetLifeMomentCommandHandler(repository);
  },
  inject: [PetLifeMomentInMemoryRepository],
};

const removePetLifeMomentUseCaseProvider = {
  provide: RemovePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new RemovePetLifeMomentCommandHandler(repository);
  },
  inject: [PetLifeMomentInMemoryRepository],
};

const updatePetLifeMomentUseCaseProvider = {
  provide: UpdatePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new UpdatePetLifeMomentCommandHandler(repository);
  },
  inject: [PetLifeMomentInMemoryRepository],
};

const findPetLifeMomentUseCaseProvider = {
  provide: FindPetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new FindPetLifeMomentUseCase(repository);
  },
  inject: [PetLifeMomentInMemoryRepository],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    petLifeMomentRepositoryProvider,
    addPetLifeMomentUseCaseProvider,
    removePetLifeMomentUseCaseProvider,
    updatePetLifeMomentUseCaseProvider,
    findPetLifeMomentUseCaseProvider,
  ],
  exports: [
    AddPetLifeMomentCommandHandler,
    RemovePetLifeMomentCommandHandler,
    UpdatePetLifeMomentCommandHandler,
    FindPetLifeMomentUseCase,
    PetLifeMomentInMemoryRepository,
  ],
})
export class PetLifeMomentsModule {}
