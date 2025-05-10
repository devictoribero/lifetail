import { Module } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/contexts/Lifetails/Users/domain/services/GetUserService';
import {
  UserRepository,
  USER_REPOSITORY,
} from 'src/contexts/Lifetails/Users/domain/repositories/UserRepository';
// Application imports
import { GetUserQueryHandler } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQueryHandler';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';
// Infrastructure imports
import { UserInMemoryRepository } from 'src/contexts/Lifetails/Users/infrastructure/UserInMemoryRepository';

@Module({
  imports: [],
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
  ],
  exports: [CreateUserCommandHandler, GetUserQueryHandler, USER_REPOSITORY],
})
export class UsersModule {}
