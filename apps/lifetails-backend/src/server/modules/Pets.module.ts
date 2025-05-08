import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { FindPetUseCase } from 'src/contexts/Lifetails/Pets/application/find/FindPetUseCase';
import { SearchAllPetsUseCase } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsUseCase';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/Lifetails/Pets/infrastructure/PetInMemoryRepository';
// Domain imports
import { PetRepository } from 'src/contexts/Lifetails/Pets/domain/repositories/PetRepository';

const petRepositoryProvider = {
  provide: 'PetRepository',
  useClass: PetInMemoryRepository,
};

const addPetCommandHandlerProvider = {
  provide: AddPetCommandHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new AddPetCommandHandler(repository);
  },
  inject: ['PetRepository'],
};

const removePetUseCaseProvider = {
  provide: RemovePetCommandHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new RemovePetCommandHandler(repository);
  },
  inject: ['PetRepository'],
};

const updatePetUseCaseProvider = {
  provide: UpdatePetCommandHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new UpdatePetCommandHandler(repository);
  },
  inject: ['PetRepository'],
};

const findPetUseCaseProvider = {
  provide: FindPetUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new FindPetUseCase(repository);
  },
  inject: ['PetRepository'],
};

const searchAllPetsUseCaseProvider = {
  provide: SearchAllPetsUseCase,
  useFactory: (repository: PetInMemoryRepository) => {
    return new SearchAllPetsUseCase(repository);
  },
  inject: ['PetRepository'],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    petRepositoryProvider,
    addPetCommandHandlerProvider,
    removePetUseCaseProvider,
    updatePetUseCaseProvider,
    findPetUseCaseProvider,
    searchAllPetsUseCaseProvider,
  ],
  exports: [
    'PetRepository',
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    FindPetUseCase,
    SearchAllPetsUseCase,
  ],
})
export class PetsModule {}
