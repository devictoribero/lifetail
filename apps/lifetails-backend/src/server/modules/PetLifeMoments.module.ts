import { Module } from '@nestjs/common';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { RemovePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from 'src/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentMutation } from '../graphql/contexts/PetLifeMoments/add/AddPetLifeMomentMutation';
import { RemovePetLifeMomentMutation } from '../graphql/contexts/PetLifeMoments/remove/RemovePetLifeMomentMutation';
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
    AddPetLifeMomentMutation,
    RemovePetLifeMomentMutation,
    HealthCheckQuery,
    DateScalar,
  ],
  exports: [
    AddPetLifeMomentUseCase,
    RemovePetLifeMomentUseCase,
    PetLifeMomentInMemoryRepository
  ],
})
export class PetLifeMomentsModule {}
