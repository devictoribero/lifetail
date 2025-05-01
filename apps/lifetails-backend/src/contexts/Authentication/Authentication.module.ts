import { Module } from '@nestjs/common';
import { AccountInMemoryRepository } from './infrastructure/AccountInMemoryRepository';
import { PasswordHasher } from './domain/services/PasswordHasher';
import { CreateAccountUseCase } from './application/createAccount/CreateAccountUseCase';
import { CreateAccountMutation } from './graphql/createAccount/CreateAccountMutation';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'AccountRepository',
      useClass: AccountInMemoryRepository,
    },
    PasswordHasher,
    {
      provide: CreateAccountUseCase,
      useFactory: (repository: AccountInMemoryRepository, hasher: PasswordHasher) => {
        return new CreateAccountUseCase(repository, hasher);
      },
      inject: ['AccountRepository', PasswordHasher],
    },
    CreateAccountMutation,
  ],
  exports: ['AccountRepository', PasswordHasher, CreateAccountUseCase],
})
export class AuthenticationModule {}
