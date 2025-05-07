import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/createUser/CreateUserUseCase';
import { GetUserUseCase } from './application/getUser/GetUserUseCase';
import { UserInMemoryRepository } from './infrastructure/UserInMemoryRepository';
import { GraphqlModule } from 'src/Lifetails/contexts/Shared/Graphql.module';
import { GetUserService } from './domain/services/GetUserService';

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

const userRepositoryProvider = {
  provide: UserInMemoryRepository,
  useClass: UserInMemoryRepository,
};

@Module({
  imports: [GraphqlModule],
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
