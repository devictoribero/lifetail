import { Module } from '@nestjs/common';
import { AddPetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { RemovePetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { UpdatePetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { FindPetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from 'src/Lifetails/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentMutation } from 'src/Lifetails/contexts/PetLifeMoments/graphql/add/AddPetLifeMomentMutation';
import { RemovePetLifeMomentMutation } from 'src/Lifetails/contexts/PetLifeMoments/graphql/remove/RemovePetLifeMomentMutation';
import { UpdatePetLifeMomentMutation } from 'src/Lifetails/contexts/PetLifeMoments/graphql/update/UpdatePetLifeMomentMutation';
import { FindPetLifeMoment } from './graphql/find/FindPetLifeMomentQuery';
import { GraphqlModule } from 'src/Lifetails/contexts/Shared/Graphql.module';

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

const petLifeMomentRepositoryProvider = {
  provide: PetLifeMomentInMemoryRepository,
  useClass: PetLifeMomentInMemoryRepository,
};

@Module({
  imports: [GraphqlModule],
  controllers: [],
  providers: [
    petLifeMomentRepositoryProvider,
    addPetLifeMomentUseCaseProvider,
    removePetLifeMomentUseCaseProvider,
    updatePetLifeMomentUseCaseProvider,
    findPetLifeMomentUseCaseProvider,
    AddPetLifeMomentMutation,
    RemovePetLifeMomentMutation,
    UpdatePetLifeMomentMutation,
    FindPetLifeMoment,
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
