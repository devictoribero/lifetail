import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/createUser/CreateUserUseCase';
import { GetUserUseCase } from './application/getUser/GetUserUseCase';
import { UserInMemoryRepository } from './infrastructure/UserInMemoryRepository';
import { GraphqlModule } from 'src/contexts/Shared/Graphql.module';

const createUserUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: (repository: UserInMemoryRepository) => {
    return new CreateUserUseCase(repository);
  },
  inject: [UserInMemoryRepository],
};

const getUserUseCaseProvider = {
  provide: GetUserUseCase,
  useFactory: (repository: UserInMemoryRepository) => {
    return new GetUserUseCase(repository);
  },
  inject: [UserInMemoryRepository],
};

const userRepositoryProvider = {
  provide: UserInMemoryRepository,
  useClass: UserInMemoryRepository,
};

@Module({
  imports: [GraphqlModule],
  controllers: [],
  providers: [userRepositoryProvider, createUserUseCaseProvider, getUserUseCaseProvider],
  exports: [CreateUserUseCase, GetUserUseCase, UserInMemoryRepository],
})
export class UsersModule {}
