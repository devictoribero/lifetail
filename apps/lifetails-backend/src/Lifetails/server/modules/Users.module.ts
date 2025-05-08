import { Module } from '@nestjs/common';
// Domain imports
import { GetUserService } from 'src/Lifetails/contexts/Users/domain/services/GetUserService';
// Application imports
import { CreateUserUseCase } from 'src/Lifetails/contexts/Users/application/createUser/CreateUserUseCase';
import { GetUserUseCase } from 'src/Lifetails/contexts/Users/application/getUser/GetUserUseCase';
// Infrastructure imports
import { UserInMemoryRepository } from 'src/Lifetails/contexts/Users/infrastructure/UserInMemoryRepository';

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

const createUserUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: (repository: UserInMemoryRepository, getUserService: GetUserService) => {
    return new CreateUserUseCase(getUserService, repository);
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
    createUserUseCaseProvider,
    getUserUseCaseProvider,
  ],
  exports: [CreateUserUseCase, GetUserUseCase, UserInMemoryRepository],
})
export class UsersModule {}
