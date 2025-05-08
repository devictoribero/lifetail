import { Module } from '@nestjs/common';
// Application imports
import { PasswordHasher } from 'src/Lifetails/contexts/Authentication/domain/services/PasswordHasher';
import { CreateAccountUseCase } from 'src/Lifetails/contexts/Authentication/application/createAccount/CreateAccountUseCase';
import { AuthenticateAccountUseCase } from 'src/Lifetails/contexts/Authentication/application/authenticateAccount/AuthenticateAccountUseCase';
// Infrastructure imports
import { AccountInMemoryRepository } from 'src/Lifetails/contexts/Authentication/infrastructure/AccountInMemoryRepository';

const accountRepositoryProvider = {
  provide: 'AccountRepository',
  useClass: AccountInMemoryRepository,
};

const createAccountUseCaseProvider = {
  provide: CreateAccountUseCase,
  useFactory: (repository: AccountInMemoryRepository, hasher: PasswordHasher) => {
    return new CreateAccountUseCase(repository, hasher);
  },
  inject: ['AccountRepository', PasswordHasher],
};

const authenticateAccountUseCaseProvider = {
  provide: AuthenticateAccountUseCase,
  useFactory: (repository: AccountInMemoryRepository, hasher: PasswordHasher) => {
    return new AuthenticateAccountUseCase(repository, hasher);
  },
  inject: ['AccountRepository', PasswordHasher],
};

@Module({
  imports: [],
  controllers: [],
  providers: [
    accountRepositoryProvider,
    PasswordHasher,
    createAccountUseCaseProvider,
    authenticateAccountUseCaseProvider,
  ],
  exports: ['AccountRepository', PasswordHasher, CreateAccountUseCase, AuthenticateAccountUseCase],
})
export class AuthenticationModule {}
