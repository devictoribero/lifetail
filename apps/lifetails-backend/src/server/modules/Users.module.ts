import { Module } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/contexts/Lifetails/Users/domain/services/GetUserService';
import {
  UserRepository,
  UserRepositorySymbol,
} from 'src/contexts/Lifetails/Users/domain/repositories/UserRepository';
// Application imports
import { GetUserQueryHandler } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQueryHandler';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';
// Infrastructure imports
import { UserInMemoryRepository } from 'src/contexts/Lifetails/Users/infrastructure/UserInMemoryRepository';

const userRepositoryProvider = {
  provide: UserRepositorySymbol,
  useClass: UserInMemoryRepository,
};

const getUserServiceProvider = {
  provide: GetUserService,
  useFactory: (repository: UserRepository) => {
    return new GetUserService(repository);
  },
  inject: [UserRepositorySymbol],
};

const createUserCommandHandlerProvider = {
  provide: CreateUserCommandHandler,
  useFactory: (repository: UserRepository, getUserService: GetUserService) => {
    return new CreateUserCommandHandler(getUserService, repository);
  },
  inject: [UserRepositorySymbol, GetUserService],
};

const GetUserQueryHandlerProvider = {
  provide: GetUserQueryHandler,
  useFactory: (service: GetUserService) => {
    return new GetUserQueryHandler(service);
  },
  inject: [GetUserService],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    userRepositoryProvider,
    getUserServiceProvider,
    createUserCommandHandlerProvider,
    GetUserQueryHandlerProvider,
    UserInMemoryRepository,
  ],
  exports: [
    UserRepositorySymbol,
    CreateUserCommandHandler,
    GetUserQueryHandler,
    UserInMemoryRepository,
  ],
})
export class UsersModule {}
