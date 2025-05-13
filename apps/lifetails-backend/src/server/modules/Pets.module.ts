import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { GetPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/get/GetPetQueryHandler';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/Lifetails/Pets/infrastructure/PetInMemoryRepository';
// Domain imports
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { PET_REPOSITORY } from 'src/contexts/Lifetails/Pets/domain/repositories/PetRepository';
import { AddPetGQLMutation } from '../graphql/PetManagement/Pets/add/AddPetGQLMutation';
import { RemovePetGQLMutation } from '../graphql/PetManagement/Pets/remove/RemovePetGQLMutation';
import { UpdatePetGQLMutation } from '../graphql/PetManagement/Pets/update/UpdatePetGQLMutation';
import { GetPetGQLQuery } from '../graphql/PetManagement/Pets/find/GetPetGQLQuery';
import { SearchAllPetsGQLQuery } from '../graphql/PetManagement/Pets/searchAll/SearchAllPetsGQLQuery';
import { SharedModule } from './Shared.module';
import { AuthenticationModule } from './Authentication.module';

@Module({
  imports: [SharedModule, AuthenticationModule],
  controllers: [],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: PetInMemoryRepository,
    },
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
  ],
  exports: [
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
  ],
})
export class PetsModule {}
