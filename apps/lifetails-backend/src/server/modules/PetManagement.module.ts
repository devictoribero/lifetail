import { Module } from '@nestjs/common';
// Application imports
import { AddPetCommandHandler } from 'src/contexts/PetManagement/Pet/application/add/AddPetCommandHandler';
import { RemovePetCommandHandler } from 'src/contexts/PetManagement/Pet/application/remove/RemovePetCommandHandler';
import { UpdatePetCommandHandler } from 'src/contexts/PetManagement/Pet/application/update/UpdatePetCommandHandler';
import { GetPetQueryHandler } from 'src/contexts/PetManagement/Pet/application/get/GetPetQueryHandler';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinary/application/AddVeterinary/AddVeterinaryCommandHandler';
import { DeleteVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinary/application/DeleteVeterinary/DeleteVeterinaryCommandHandler';
import { UpdateVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinary/application/UpdateVeterinary/UpdateVeterinaryCommandHandler';
// Infrastructure imports
import { PostgresqlPetRepository } from 'src/contexts/PetManagement/Pet/infrastructure/PostgresqlPetRepository';
import { VeterinaryInMemoryRepository } from 'src/contexts/PetManagement/Veterinary/infrastructure/VeterinaryInMemoryRepository';
// Domain imports
import { SearchAllPetsQueryHandler } from 'src/contexts/PetManagement/Pet/application/searchAll/SearchAllPetsQueryHandler';
import { PET_REPOSITORY } from 'src/contexts/PetManagement/Pet/domain/repositories/PetRepository';
import { VETERINARY_REPOSITORY } from 'src/contexts/PetManagement/Veterinary/domain/repositories/VeterinaryRepository';
import { AddPetGQLMutation } from '../graphql/PetManagement/Pet/add/AddPetGQLMutation';
import { RemovePetGQLMutation } from '../graphql/PetManagement/Pet/remove/RemovePetGQLMutation';
import { UpdatePetGQLMutation } from '../graphql/PetManagement/Pet/update/UpdatePetGQLMutation';
import { GetPetGQLQuery } from '../graphql/PetManagement/Pet/find/GetPetGQLQuery';
import { SearchAllPetsGQLQuery } from '../graphql/PetManagement/Pet/searchAll/SearchAllPetsGQLQuery';
import { AddVeterinaryGQLMutation } from '../graphql/PetManagement/Veterinary/add/AddVeterinaryGQLMutation';
import { DeleteVeterinaryGQLMutation } from '../graphql/PetManagement/Veterinary/delete/DeleteVeterinaryGQLMutation';
import { UpdateVeterinaryGQLMutation } from '../graphql/PetManagement/Veterinary/update/UpdateVeterinaryGQLMutation';
import { SharedModule } from './Shared.module';
import { IdentityModule } from './Identity.module';
import { GetVeterinaryQueryHandler } from 'src/contexts/PetManagement/Veterinary/application/GetVeterinary/GetVeterinaryQueryHandler';
import { GetVeterinaryGQLQuery } from '../graphql/PetManagement/Veterinary/get/GetVeterinaryGQLQuery';

@Module({
  imports: [SharedModule, IdentityModule],
  controllers: [],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: PostgresqlPetRepository,
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
    GetVeterinaryQueryHandler,
    DeleteVeterinaryCommandHandler,
    UpdateVeterinaryCommandHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    GetVeterinaryGQLQuery,
    SearchAllPetsGQLQuery,
    AddVeterinaryGQLMutation,
    DeleteVeterinaryGQLMutation,
    UpdateVeterinaryGQLMutation,
  ],
  exports: [
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    GetPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddVeterinaryCommandHandler,
    DeleteVeterinaryCommandHandler,
    UpdateVeterinaryCommandHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    GetPetGQLQuery,
    SearchAllPetsGQLQuery,
    AddVeterinaryGQLMutation,
    DeleteVeterinaryGQLMutation,
    UpdateVeterinaryGQLMutation,
  ],
})
export class PetManagementModule {}
