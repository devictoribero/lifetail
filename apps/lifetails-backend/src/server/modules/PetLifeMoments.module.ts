import { Module } from '@nestjs/common';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { RemovePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { UpdatePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { FindPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from 'src/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentMutation } from '../graphql/contexts/PetLifeMoments/add/AddPetLifeMomentMutation';
import { RemovePetLifeMomentMutation } from '../graphql/contexts/PetLifeMoments/remove/RemovePetLifeMomentMutation';
import { UpdatePetLifeMomentMutation } from '../graphql/contexts/PetLifeMoments/update/UpdatePetLifeMomentMutation';
import { FindPetLifeMoment } from '../graphql/contexts/PetLifeMoments/find/FindPetLifeMomentQuery';
import { HealthCheckQuery } from '../graphql/contexts/Health/HealthCheckQuery';
import { DateScalar } from '../graphql/Shared/scalars/DateScalar';

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
