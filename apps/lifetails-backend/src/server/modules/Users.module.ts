import { Module } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/contexts/Lifetails/Users/domain/services/GetUserService';
import { UserRepository } from 'src/contexts/Lifetails/Users/domain/repositories/UserRepository';
// Application imports
import { GetUserUseCase } from 'src/contexts/Lifetails/Users/application/getUser/GetUserUseCase';
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

const getUserUseCaseProvider = {
  provide: GetUserUseCase,
  useFactory: (service: GetUserService) => {
    return new GetUserUseCase(service);
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
    getUserUseCaseProvider,
  ],
  exports: ['UserRepository', CreateUserCommandHandler, GetUserUseCase],
})
export class UsersModule {}
