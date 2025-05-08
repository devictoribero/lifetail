import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/Lifetails/Pets/infrastructure/PetInMemoryRepository';
// Domain imports
import { PetRepositorySymbol } from 'src/contexts/Lifetails/Pets/domain/repositories/PetRepository';
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';

const petRepositoryProvider = {
  provide: PetRepositorySymbol,
  useClass: PetInMemoryRepository,
};

const addPetCommandHandlerProvider = {
  provide: AddPetCommandHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new AddPetCommandHandler(repository);
  },
  inject: [PetRepositorySymbol],
};

const removePetCommandHandlerProvider = {
  provide: RemovePetCommandHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new RemovePetCommandHandler(repository);
  },
  inject: [PetRepositorySymbol],
};

const updatePetCommandHandlerProvider = {
  provide: UpdatePetCommandHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new UpdatePetCommandHandler(repository);
  },
  inject: [PetRepositorySymbol],
};

const findPetQueryHandlerProvider = {
  provide: FindPetQueryHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new FindPetQueryHandler(repository);
  },
  inject: [PetRepositorySymbol],
};

const searchAllPetsQueryHandlerProvider = {
  provide: SearchAllPetsQueryHandler,
  useFactory: (repository: PetInMemoryRepository) => {
    return new SearchAllPetsQueryHandler(repository);
  },
  inject: [PetRepositorySymbol],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    petRepositoryProvider,
    addPetCommandHandlerProvider,
    removePetCommandHandlerProvider,
    updatePetCommandHandlerProvider,
    findPetQueryHandlerProvider,
    searchAllPetsQueryHandlerProvider,
  ],
  exports: [
    PetRepositorySymbol,
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    FindPetQueryHandler,
    SearchAllPetsQueryHandler,
  ],
})
export class PetsModule {}
