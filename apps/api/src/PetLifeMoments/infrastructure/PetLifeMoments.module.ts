import { Module } from '@nestjs/common';
import { RegisterPetLifeMomentUseCase } from '../application/register-pet-life-moment/RegisterPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from './persistence/PetLifeMomentInMemoryRepository';
import { RegisterPetLifeMomentMutation } from './graphql/resolvers/RegisterPetLifeMomentMutation';
import { DateScalar } from './graphql/scalars/DateScalar';
import { HealthCheckQuery } from './graphql/resolvers/HealthCheckQuery';

const registerPetLifeMomentUseCaseProvider = {
  provide: RegisterPetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentInMemoryRepository) => {
    return new RegisterPetLifeMomentUseCase(repository);
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
    registerPetLifeMomentUseCaseProvider,
    RegisterPetLifeMomentMutation,
    HealthCheckQuery,
    DateScalar,
  ],
  exports: [RegisterPetLifeMomentUseCase, PetLifeMomentInMemoryRepository],
})
export class PetLifeMomentsModule {}
