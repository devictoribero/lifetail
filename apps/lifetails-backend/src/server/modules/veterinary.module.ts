import { Module } from '@nestjs/common';
import { VETERINARY_REPOSITORY } from 'src/contexts/PetManagement/Veterinaries/domain/repositories/VeterinaryRepository';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommandHandler';
import { GetVeterinaryQueryHandler } from 'src/contexts/PetManagement/Veterinaries/application/GetVeterinary/GetVeterinaryQueryHandler';
import { DeleteVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/DeleteVeterinary/DeleteVeterinaryCommandHandler';
import { DeleteVeterinaryGQLMutation } from 'src/server/graphql/PetManagement/Veterinary/delete/DeleteVeterinaryGQLMutation';
import { GetVeterinaryGQLQuery } from 'src/server/graphql/PetManagement/Veterinary/get/GetVeterinaryGQLQuery';
import { VeterinaryInMemoryRepository } from 'src/contexts/PetManagement/Veterinaries/infrastructure/VeterinaryInMemoryRepository';

@Module({
  providers: [
    // Command handlers
    AddVeterinaryCommandHandler,
    DeleteVeterinaryCommandHandler,

    // Query handlers
    GetVeterinaryQueryHandler,

    // GraphQL resolvers
    DeleteVeterinaryGQLMutation,
    GetVeterinaryGQLQuery,

    // Repository implementation
    {
      provide: VETERINARY_REPOSITORY,
      useClass: VeterinaryInMemoryRepository,
    },
  ],
  exports: [AddVeterinaryCommandHandler, DeleteVeterinaryCommandHandler, GetVeterinaryQueryHandler],
})
export class VeterinaryModule {}
