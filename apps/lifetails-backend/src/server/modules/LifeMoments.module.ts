import { Module } from '@nestjs/common';
// Domain imports
import { LIFE_MOMENT_REPOSITORY } from 'src/contexts/Lifetails/LifeMoments/domain/repositories/LifeMomentRepository';
// Application imports
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommandHandler';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/remove/RemoveLifeMomentCommandHandler';
import { UpdateLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/update/UpdateLifeMomentCommandHandler';
import { FindLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/find/FindLifeMomentQueryHandler';
import { SearchLifeMomentsQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/search/SearchLifeMomentsQueryHandler';
// Infrastructure imports
import { LifeMomentInMemoryRepository } from 'src/contexts/Lifetails/LifeMoments/infrastructure/LifeMomentInMemoryRepository';
import { AuthenticationModule } from './Authentication.module';
// GraphQL imports
import { AddLifeMomentGQLMutation } from '../graphql/LifeMoments/add/AddLifeMomentGQLMutation';
import { RemoveLifeMomentGQLMutation } from '../graphql/LifeMoments/remove/RemoveLifeMomentGQLMutation';
import { UpdateLifeMomentGQLMutation } from '../graphql/LifeMoments/update/UpdateLifeMomentGQLMutation';
import { SearchLifeMomentsGQLQuery } from '../graphql/LifeMoments/search/SearchLifeMomentsGQLQuery';
import { FindLifeMomentGQLQuery } from '../graphql/LifeMoments/find/FindLifeMomentGQLQuery';
import { SharedModule } from './Shared.module';

@Module({
  imports: [SharedModule, AuthenticationModule],
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
    FindLifeMomentQueryHandler,
    SearchLifeMomentsQueryHandler,
    // GraphQL resolvers
    AddLifeMomentGQLMutation,
    RemoveLifeMomentGQLMutation,
    UpdateLifeMomentGQLMutation,
    FindLifeMomentGQLQuery,
    SearchLifeMomentsGQLQuery,
  ],
  exports: [
    // Application handlers
    AddLifeMomentCommandHandler,
    RemoveLifeMomentCommandHandler,
    UpdateLifeMomentCommandHandler,
    FindLifeMomentQueryHandler,
    SearchLifeMomentsQueryHandler,
    // GraphQL resolvers
    AddLifeMomentGQLMutation,
    RemoveLifeMomentGQLMutation,
    UpdateLifeMomentGQLMutation,
    FindLifeMomentGQLQuery,
    SearchLifeMomentsGQLQuery,
  ],
})
export class LifeMomentsModule {}
