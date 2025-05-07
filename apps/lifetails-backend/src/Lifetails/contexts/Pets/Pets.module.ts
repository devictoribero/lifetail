import { Module } from '@nestjs/common';
import { AddPetUseCase } from 'src/Lifetails/contexts/Pets/application/add/AddPetUseCase';
import { RemovePetUseCase } from 'src/Lifetails/contexts/Pets/application/remove/RemovePetUseCase';
import { UpdatePetUseCase } from 'src/Lifetails/contexts/Pets/application/update/UpdatePetUseCase';
import { FindPetUseCase } from 'src/Lifetails/contexts/Pets/application/find/FindPetUseCase';
import { PetInMemoryRepository } from 'src/Lifetails/contexts/Pets/infrastructure/PetInMemoryRepository';
import { AddPetMutation } from 'src/Lifetails/contexts/Pets/graphql/add/AddPetMutation';
import { RemovePetMutation } from 'src/Lifetails/contexts/Pets/graphql/remove/RemovePetMutation';
import { UpdatePetMutation } from 'src/Lifetails/contexts/Pets/graphql/update/UpdatePetMutation';
import { FindPetQuery } from './graphql/find/FindPetQuery';
import { SearchAllPetsQuery as SearchAllPetsGraphQLQuery } from './graphql/searchAll/SearchAllPetsQuery';
import { GraphqlModule } from 'src/Lifetails/contexts/Shared/Graphql.module';
import { SearchAllPetsUseCase } from './application/searchAll/SearchAllPetsUseCase';

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

const petRepositoryProvider = {
  provide: PetInMemoryRepository,
  useClass: PetInMemoryRepository,
};

@Module({
  imports: [GraphqlModule],
  controllers: [],
  providers: [
    petRepositoryProvider,
    addPetUseCaseProvider,
    removePetUseCaseProvider,
    updatePetUseCaseProvider,
    findPetUseCaseProvider,
    searchAllPetsUseCaseProvider,
    AddPetMutation,
    RemovePetMutation,
    UpdatePetMutation,
    FindPetQuery,
    SearchAllPetsGraphQLQuery,
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
