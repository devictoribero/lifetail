import { Module } from '@nestjs/common';
import { AddPetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { RemovePetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { UpdatePetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { FindPetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from 'src/modules/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { HealthCheckQuery } from 'src/modules/Shared/HealthCheckQuery';
import { DateScalar } from 'src/modules/Shared/graphql/DateScalar';
import { AddPetLifeMomentMutation } from 'src/modules/PetLifeMoments/graphql/add/AddPetLifeMomentMutation';
import { RemovePetLifeMomentMutation } from 'src/modules/PetLifeMoments/graphql/remove/RemovePetLifeMomentMutation';
import { UpdatePetLifeMomentMutation } from 'src/modules/PetLifeMoments/graphql/update/UpdatePetLifeMomentMutation';
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
