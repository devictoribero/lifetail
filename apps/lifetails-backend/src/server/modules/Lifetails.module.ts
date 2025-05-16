import { Module } from '@nestjs/common';
// Domain imports
import { LIFE_MOMENT_REPOSITORY } from 'src/contexts/Lifetails/LifeMoment/domain/repositories/LifeMomentRepository';
// Application imports
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoment/application/add/AddLifeMomentCommandHandler';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoment/application/remove/RemoveLifeMomentCommandHandler';
import { UpdateLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoment/application/update/UpdateLifeMomentCommandHandler';
import { GetLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoment/application/get/GetLifeMomentQueryHandler';
import { SearchLifeMomentsQueryHandler } from 'src/contexts/Lifetails/LifeMoment/application/search/SearchLifeMomentsQueryHandler';
// Event handlers
import { AddArrivalLifeMomentOnPetAdded } from 'src/contexts/Lifetails/LifeMoment/application/domain-event-handlers/AddArrivalLifeMomentOnPetAdded';
// Infrastructure imports
import { LifeMomentInMemoryRepository } from 'src/contexts/Lifetails/LifeMoment/infrastructure/LifeMomentInMemoryRepository';
// GraphQL imports
import { AddLifeMomentGQLMutation } from '../graphql/Lifetail/LifeMoment/add/AddLifeMomentGQLMutation';
import { RemoveLifeMomentGQLMutation } from '../graphql/Lifetail/LifeMoment/remove/RemoveLifeMomentGQLMutation';
import { UpdateLifeMomentGQLMutation } from '../graphql/Lifetail/LifeMoment/update/UpdateLifeMomentGQLMutation';
import { SearchLifeMomentsGQLQuery } from '../graphql/Lifetail/LifeMoment/search/SearchLifeMomentsGQLQuery';
import { GetLifeMomentGQLQuery } from '../graphql/Lifetail/LifeMoment/find/GetLifeMomentGQLQuery';
import { SharedModule } from './Shared.module';
import { IdentityModule } from './Identity.module';

@Module({
  imports: [SharedModule, IdentityModule],
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
