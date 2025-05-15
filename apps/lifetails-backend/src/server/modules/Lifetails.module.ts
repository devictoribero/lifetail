import { Module } from '@nestjs/common';
// Domain imports
import { LIFE_MOMENT_REPOSITORY } from 'src/contexts/Lifetails/LifeMoments/domain/repositories/LifeMomentRepository';
// Application imports
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommandHandler';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/remove/RemoveLifeMomentCommandHandler';
import { UpdateLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/update/UpdateLifeMomentCommandHandler';
import { GetLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/get/GetLifeMomentQueryHandler';
import { SearchLifeMomentsQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/search/SearchLifeMomentsQueryHandler';
// Event handlers
import { AddArrivalLifeMomentOnPetAdded } from 'src/contexts/Lifetails/LifeMoments/application/domain-event-handlers/AddArrivalLifeMomentOnPetAdded';
// Infrastructure imports
import { LifeMomentInMemoryRepository } from 'src/contexts/Lifetails/LifeMoments/infrastructure/LifeMomentInMemoryRepository';
// GraphQL imports
import { AddLifeMomentGQLMutation } from '../graphql/Lifetail/LifeMoments/add/AddLifeMomentGQLMutation';
import { RemoveLifeMomentGQLMutation } from '../graphql/Lifetail/LifeMoments/remove/RemoveLifeMomentGQLMutation';
import { UpdateLifeMomentGQLMutation } from '../graphql/Lifetail/LifeMoments/update/UpdateLifeMomentGQLMutation';
import { SearchLifeMomentsGQLQuery } from '../graphql/Lifetail/LifeMoments/search/SearchLifeMomentsGQLQuery';
import { GetLifeMomentGQLQuery } from '../graphql/Lifetail/LifeMoments/find/GetLifeMomentGQLQuery';
import { SharedModule } from './Shared.module';
import { PetsModule } from './Pets.module';
import { IdentityModule } from './Identity.module';

@Module({
  imports: [SharedModule, IdentityModule, PetsModule],
  controllers: [],
  providers: [
    {
      provide: LIFE_MOMENT_REPOSITORY,
      useClass: LifeMomentInMemoryRepository,
    },
    // Application handlers
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    GetLifeMomentQueryHandler,
    SearchLifeMomentsQueryHandler,
    // Event handlers
    AddArrivalLifeMomentOnPetAdded,
    // GraphQL resolvers
    AddLifeMomentGQLMutation,
    RemoveLifeMomentGQLMutation,
    UpdateLifeMomentGQLMutation,
    GetLifeMomentGQLQuery,
    SearchLifeMomentsGQLQuery,
  ],
  exports: [
    // Application handlers
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    GetLifeMomentQueryHandler,
    SearchLifeMomentsQueryHandler,
    // GraphQL resolvers
    AddLifeMomentGQLMutation,
    RemoveLifeMomentGQLMutation,
    UpdateLifeMomentGQLMutation,
    GetLifeMomentGQLQuery,
    SearchLifeMomentsGQLQuery,
  ],
})
export class LifetailsModule {}
