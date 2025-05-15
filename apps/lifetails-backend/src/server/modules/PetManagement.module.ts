import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/PetManagement/Pets/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/PetManagement/Pets/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/PetManagement/Pets/application/update/UpdatePetCommandHandler';
import { GetPetQueryHandler } from 'src/contexts/PetManagement/Pets/application/get/GetPetQueryHandler';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommandHandler';
import { DeleteVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/DeleteVeterinary/DeleteVeterinaryCommandHandler';
// Infrastructure imports
import { PetInMemoryRepository } from 'src/contexts/PetManagement/Pets/infrastructure/PetInMemoryRepository';
import { VeterinaryInMemoryRepository } from 'src/contexts/PetManagement/Veterinaries/infrastructure/VeterinaryInMemoryRepository';
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
import { DeleteVeterinaryGQLMutation } from '../graphql/PetManagement/Veterinary/delete/DeleteVeterinaryGQLMutation';
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
      useClass: VeterinaryInMemoryRepository,
    },
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddVeterinaryCommandHandler,
    DeleteVeterinaryCommandHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
    AddVeterinaryGQLMutation,
    DeleteVeterinaryGQLMutation,
  ],
  exports: [
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddVeterinaryCommandHandler,
    DeleteVeterinaryCommandHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
    AddVeterinaryGQLMutation,
    DeleteVeterinaryGQLMutation,
  ],
})
export class PetManagementModule {}
