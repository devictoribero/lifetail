import { Module } from '@nestjs/common';
// Application imports
import { AddPetUseCase } from 'src/contexts/Lifetails/Pets/application/add/AddPetUseCase';
import { RemovePetUseCase } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetUseCase';
import { UpdatePetUseCase } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetUseCase';
import { FindPetUseCase } from 'src/contexts/Lifetails/Pets/application/find/FindPetUseCase';
import { SearchAllPetsUseCase } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsUseCase';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/Lifetails/Pets/infrastructure/PetInMemoryRepository';

const petRepositoryProvider = {
  provide: PetInMemoryRepository,
  useClass: PetInMemoryRepository,
};

const addPetUseCaseProvider = {
  provide: AddPetUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new AddPetUseCase(repository);
  },
  inject: [PetInMemoryRepository],
};

const removePetUseCaseProvider = {
  provide: RemovePetUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new RemovePetUseCase(repository);
  },
  inject: [PetInMemoryRepository],
};

const updatePetUseCaseProvider = {
  provide: UpdatePetUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new UpdatePetUseCase(repository);
  },
  inject: [PetInMemoryRepository],
};

const findPetUseCaseProvider = {
  provide: FindPetUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new FindPetUseCase(repository);
  },
  inject: [PetInMemoryRepository],
};

const searchAllPetsUseCaseProvider = {
  provide: SearchAllPetsUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new SearchAllPetsUseCase(repository);
  },
  inject: [PetInMemoryRepository],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    petRepositoryProvider,
    addPetUseCaseProvider,
    removePetUseCaseProvider,
    updatePetUseCaseProvider,
    findPetUseCaseProvider,
    searchAllPetsUseCaseProvider,
  ],
  exports: [
    AddPetUseCase,
    RemovePetUseCase,
    UpdatePetUseCase,
    FindPetUseCase,
    SearchAllPetsUseCase,
    PetInMemoryRepository,
  ],
})
export class PetsModule {}
