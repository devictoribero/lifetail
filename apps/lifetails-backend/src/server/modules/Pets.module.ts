import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/Lifetails/Pets/infrastructure/PetInMemoryRepository';
// Domain imports
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { PET_REPOSITORY } from 'src/contexts/Lifetails/Pets/domain/repositories/PetRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: PetInMemoryRepository,
    },
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    FindPetQueryHandler,
    SearchAllPetsQueryHandler,
  ],
  exports: [
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    FindPetQueryHandler,
    SearchAllPetsQueryHandler,
  ],
})
export class PetsModule {}
