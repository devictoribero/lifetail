import { Module } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/contexts/Lifetails/Users/domain/services/GetUserService';
// Application imports
import { GetUserUseCase } from 'src/contexts/Lifetails/Users/application/getUser/GetUserUseCase';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';
// Infrastructure imports
import { UserInMemoryRepository } from 'src/contexts/Lifetails/Users/infrastructure/UserInMemoryRepository';

const userRepositoryProvider = {
  provide: UserInMemoryRepository,
  useClass: UserInMemoryRepository,
};

const getUserServiceProvider = {
  provide: GetUserService,
  useFactory: (repository: UserInMemoryRepository) => {
    return new GetUserService(repository);
  },
  inject: [UserInMemoryRepository],
};

const createUserCommandHandlerProvider = {
  provide: CreateUserCommandHandler,
  useFactory: (repository: UserInMemoryRepository, getUserService: GetUserService) => {
    return new CreateUserCommandHandler(getUserService, repository);
  },
  inject: [UserInMemoryRepository, GetUserService],
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
  exports: [CreateUserCommandHandler, GetUserUseCase, UserInMemoryRepository],
})
export class UsersModule {}
