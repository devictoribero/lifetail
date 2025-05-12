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
import { AddPetGQLMutation } from '../graphql/Pets/add/AddPetGQLMutation';
import { RemovePetGQLMutation } from '../graphql/Pets/remove/RemovePetGQLMutation';
import { UpdatePetGQLMutation } from '../graphql/Pets/update/UpdatePetGQLMutation';
import { FindPetGQLQuery } from '../graphql/Pets/find/FindPetGQLQuery';
import { SearchAllPetsGQLQuery } from '../graphql/Pets/searchAll/SearchAllPetsGQLQuery';
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
    FindPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    FindPetGQLQuery,
    SearchAllPetsGQLQuery,
  ],
  exports: [
    AddPetCommandHandler,
    RemovePetCommandHandler,
    UpdatePetCommandHandler,
    FindPetQueryHandler,
    SearchAllPetsQueryHandler,
    AddPetGQLMutation,
    RemovePetGQLMutation,
    UpdatePetGQLMutation,
    FindPetGQLQuery,
    SearchAllPetsGQLQuery,
  ],
})
export class PetsModule {}
