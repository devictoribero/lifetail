import { Module } from '@nestjs/common';
// Application imports
import { AddPetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { RemovePetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { UpdatePetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { FindPetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
// Infrastructure imports
import { PetLifeMomentInMemoryRepository } from 'src/Lifetails/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';

const petLifeMomentRepositoryProvider = {
  provide: PetLifeMomentInMemoryRepository,
  useClass: PetLifeMomentInMemoryRepository,
};

const addPetLifeMomentUseCaseProvider = {
  provide: AddPetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new AddPetLifeMomentUseCase(repository);
  },
  inject: [PetLifeMomentInMemoryRepository],
};

const removePetLifeMomentUseCaseProvider = {
  provide: RemovePetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new RemovePetLifeMomentUseCase(repository);
  },
  inject: [PetLifeMomentInMemoryRepository],
};

const updatePetLifeMomentUseCaseProvider = {
  provide: UpdatePetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new UpdatePetLifeMomentUseCase(repository);
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
    AddPetLifeMomentUseCase,
    RemovePetLifeMomentUseCase,
    UpdatePetLifeMomentUseCase,
    FindPetLifeMomentUseCase,
    PetLifeMomentInMemoryRepository,
  ],
})
export class PetLifeMomentsModule {}
