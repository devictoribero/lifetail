import { Module } from '@nestjs/common';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add-pet-life-moment/AddPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from 'src/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { RegisterPetLifeMomentMutation } from '../graphql/resolvers/RegisterPetLifeMomentMutation';
import { HealthCheckQuery } from '../graphql/resolvers/HealthCheckQuery';
import { DateScalar } from '../graphql/scalars/DateScalar';

const addPetLifeMomentUseCaseProvider = {
  provide: AddPetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new AddPetLifeMomentUseCase(repository);
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
    RegisterPetLifeMomentMutation,
    HealthCheckQuery,
    DateScalar,
  ],
  exports: [AddPetLifeMomentUseCase, PetLifeMomentInMemoryRepository],
})
export class PetLifeMomentsModule {}
