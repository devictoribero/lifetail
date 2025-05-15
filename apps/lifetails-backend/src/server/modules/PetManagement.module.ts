import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/PetManagement/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/PetManagement/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/PetManagement/Pets/application/update/UpdatePetCommandHandler';
import { GetPetQueryHandler } from 'src/contexts/PetManagement/Pets/application/get/GetPetQueryHandler';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommandHandler';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/PetManagement/Pets/infrastructure/PetInMemoryRepository';
// Domain imports
import { SearchAllPetsQueryHandler } from 'src/contexts/PetManagement/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { PET_REPOSITORY } from 'src/contexts/PetManagement/Pets/domain/repositories/PetRepository';
import { VETERINARY_REPOSITORY } from 'src/contexts/PetManagement/Veterinaries/domain/repositories/VeterinaryRepository';
import { AddPetGQLMutation } from '../graphql/PetManagement/Pets/add/AddPetGQLMutation';
import { RemovePetGQLMutation } from '../graphql/PetManagement/Pets/remove/RemovePetGQLMutation';
import { UpdatePetGQLMutation } from '../graphql/PetManagement/Pets/update/UpdatePetGQLMutation';
import { GetPetGQLQuery } from '../graphql/PetManagement/Pets/find/GetPetGQLQuery';
import { SearchAllPetsGQLQuery } from '../graphql/PetManagement/Pets/searchAll/SearchAllPetsGQLQuery';
import { AddVeterinaryGQLMutation } from '../graphql/PetManagement/Veterinary/add/AddVeterinaryGQLMutation';
import { SharedModule } from './Shared.module';
import { IdentityModule } from './Identity.module';

@Module({
  imports: [SharedModule, IdentityModule],
  controllers: [],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: PetInMemoryRepository,
    },
    {
      provide: VETERINARY_REPOSITORY,
      useClass: PetInMemoryRepository, // Replace with a proper Veterinary repository when available
    },
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddVeterinaryCommandHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
    AddVeterinaryGQLMutation,
  ],
  exports: [
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddVeterinaryCommandHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
    AddVeterinaryGQLMutation,
  ],
})
export class PetManagementModule {}
