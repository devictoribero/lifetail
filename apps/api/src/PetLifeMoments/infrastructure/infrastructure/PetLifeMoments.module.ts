import { Module } from '@nestjs/common';
import { RegisterPetLifeMomentUseCase } from '../../application/register-pet-life-moment/RegisterPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from '../persistence/PetLifeMomentInMemoryRepository';

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
  providers: [petLifeMomentRepositoryProvider, registerPetLifeMomentUseCaseProvider],
  exports: [RegisterPetLifeMomentUseCase, PetLifeMomentInMemoryRepository],
})
export class PetLifeMomentsModule {}
