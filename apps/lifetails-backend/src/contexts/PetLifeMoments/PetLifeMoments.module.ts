import { Module } from '@nestjs/common';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { RemovePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { UpdatePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { FindPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from 'src/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { HealthCheckQuery } from 'src/contexts/Shared/HealthCheckQuery';
import { DateScalar } from 'src/contexts/Shared/graphql/DateScalar';
import { AddPetLifeMomentMutation } from 'src/contexts/PetLifeMoments/graphql/add/AddPetLifeMomentMutation';
import { RemovePetLifeMomentMutation } from 'src/contexts/PetLifeMoments/graphql/remove/RemovePetLifeMomentMutation';
import { UpdatePetLifeMomentMutation } from 'src/contexts/PetLifeMoments/graphql/update/UpdatePetLifeMomentMutation';
import { FindPetLifeMoment } from './graphql/find/FindPetLifeMomentQuery';

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
  imports: [],
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
    HealthCheckQuery,
    DateScalar,
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
