import { Module } from '@nestjs/common';
import { AccountInMemoryRepository } from './infrastructure/AccountInMemoryRepository';
import { PasswordHasher } from './domain/services/PasswordHasher';
import { CreateAccountUseCase } from './application/createAccount/CreateAccountUseCase';
import { CreateAccountMutation } from './graphql/createAccount/CreateAccountMutation';
import { AuthenticateAccountUseCase } from './application/authenticateAccount/AuthenticateAccountUseCase';
import { AuthenticateAccountMutation } from './graphql/authenticateAccount/AuthenticateAccountMutation';

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
    {
      provide: AuthenticateAccountUseCase,
      useFactory: (repository: AccountInMemoryRepository, hasher: PasswordHasher) => {
        return new AuthenticateAccountUseCase(repository, hasher);
      },
      inject: ['AccountRepository', PasswordHasher],
    },
    CreateAccountMutation,
    AuthenticateAccountMutation,
  ],
  exports: ['AccountRepository', PasswordHasher, CreateAccountUseCase, AuthenticateAccountUseCase],
})
export class AuthenticationModule {}
