import { Module } from '@nestjs/common';
// Domain imports
import { PetLifeMomentRepository } from 'src/contexts/Lifetails/PetLifeMoments/domain/repositories/PetLifeMomentRepository';
// Application imports
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { RemovePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommandHandler';
import { UpdatePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentCommandHandler';
import { FindPetLifeMomentUseCase } from 'src/contexts/Lifetails/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
// Infrastructure imports
import { PetLifeMomentInMemoryRepository } from 'src/contexts/Lifetails/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';

const petLifeMomentRepositoryProvider = {
  provide: 'PetLifeMomentRepository',
  useClass: PetLifeMomentInMemoryRepository,
};

const addPetLifeMomentUseCaseProvider = {
  provide: AddPetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new AddPetLifeMomentCommandHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

const removePetLifeMomentUseCaseProvider = {
  provide: RemovePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new RemovePetLifeMomentCommandHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

const updatePetLifeMomentUseCaseProvider = {
  provide: UpdatePetLifeMomentCommandHandler,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new UpdatePetLifeMomentCommandHandler(repository);
  },
  inject: ['PetLifeMomentRepository'],
};

const findPetLifeMomentUseCaseProvider = {
  provide: FindPetLifeMomentUseCase,
  useFactory: (repository: PetLifeMomentRepository) => {
    return new FindPetLifeMomentUseCase(repository);
  },
  inject: ['PetLifeMomentRepository'],
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
  ],
  exports: [
    'PetLifeMomentRepository',
    AddPetLifeMomentCommandHandler,
    RemovePetLifeMomentCommandHandler,
    UpdatePetLifeMomentCommandHandler,
    FindPetLifeMomentUseCase,
  ],
})
export class PetLifeMomentsModule {}
