import { Module, forwardRef } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/contexts/Lifetails/Users/domain/services/GetUserService';
import {
  UserRepository,
  USER_REPOSITORY,
} from 'src/contexts/Lifetails/Users/domain/repositories/UserRepository';
// Application imports
import { GetUserQueryHandler } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQueryHandler';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';
import { ChangeUserPreferredLanguageCommandHandler } from 'src/contexts/Lifetails/Users/application/changePreferredLanguage/ChangeUserPreferredLanguageCommandHandler';
// Infrastructure imports
import { UserInMemoryRepository } from 'src/contexts/Lifetails/Users/infrastructure/UserInMemoryRepository';
import { SharedModule } from './Shared.module';
// Module imports
import { AuthenticationModule } from './Authentication.module';
// GraphQL imports
import { ChangeUserPreferredLanguageGQLMutation } from '../graphql/Users/changePreferredLanguage/ChangeUserPreferredLanguageGQLMutation';

@Module({
  imports: [SharedModule, forwardRef(() => AuthenticationModule)],
  controllers: [],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserInMemoryRepository,
    },
    {
      provide: GetUserService,
      useFactory: (repository: UserRepository) => {
        return new GetUserService(repository);
      },
      inject: [USER_REPOSITORY],
    },
    GetUserQueryHandler,
    CreateUserCommandHandler,
    ChangeUserPreferredLanguageCommandHandler,
    ChangeUserPreferredLanguageGQLMutation,
  ],
  exports: [
    CreateUserCommandHandler,
    GetUserQueryHandler,
    ChangeUserPreferredLanguageCommandHandler,
    USER_REPOSITORY,
    ChangeUserPreferredLanguageGQLMutation,
  ],
})
export class UsersModule {}
