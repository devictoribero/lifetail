import { Module } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/contexts/Lifetails/Users/domain/services/GetUserService';
import { UserRepository } from 'src/contexts/Lifetails/Users/domain/repositories/UserRepository';
// Application imports
import { GetUserQueryHandler } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQueryHandler';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';
// Infrastructure imports
import { UserInMemoryRepository } from 'src/contexts/Lifetails/Users/infrastructure/UserInMemoryRepository';

const userRepositoryProvider = {
  provide: 'UserRepository',
  useClass: UserInMemoryRepository,
};

const getUserServiceProvider = {
  provide: GetUserService,
  useFactory: (repository: UserRepository) => {
    return new GetUserService(repository);
  },
  inject: ['UserRepository'],
};

const createUserCommandHandlerProvider = {
  provide: CreateUserCommandHandler,
  useFactory: (repository: UserRepository, getUserService: GetUserService) => {
    return new CreateUserCommandHandler(getUserService, repository);
  },
  inject: ['UserRepository', GetUserService],
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
  ],
  exports: ['UserRepository', CreateUserCommandHandler, GetUserQueryHandler],
})
export class UsersModule {}
