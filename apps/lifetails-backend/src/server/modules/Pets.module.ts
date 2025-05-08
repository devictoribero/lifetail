import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';
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
  provide: FindPetQueryHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new FindPetQueryHandler(repository);
  },
  inject: ['PetRepository'],
};

const searchAllPetsQueryHandlerProvider = {
  provide: SearchAllPetsQueryHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new SearchAllPetsQueryHandler(repository);
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
    searchAllPetsQueryHandlerProvider,
  ],
  exports: [
    'PetRepository',
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    FindPetQueryHandler,
    SearchAllPetsQueryHandler,
  ],
})
export class PetsModule {}
