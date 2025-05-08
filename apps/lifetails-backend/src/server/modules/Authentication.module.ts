import { Module } from '@nestjs/common';
// Application imports
import { PasswordHasher } from 'src/contexts/Lifetails/Authentication/domain/services/PasswordHasher';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountUseCase } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountUseCase';
// Infrastructure imports
import { AccountInMemoryRepository } from 'src/contexts/Lifetails/Authentication/infrastructure/AccountInMemoryRepository';

const accountRepositoryProvider = {
  provide: 'AccountRepository',
  useClass: AccountInMemoryRepository,
};

const createAccountCommandHandlerProvider = {
  provide: CreateAccountCommandHandler,
  useFactory: (repository: AccountInMemoryRepository, hasher: PasswordHasher) => {
    return new CreateAccountCommandHandler(repository, hasher);
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
    createAccountCommandHandlerProvider,
    authenticateAccountUseCaseProvider,
  ],
  exports: [
    'AccountRepository',
    PasswordHasher,
    CreateAccountCommandHandler,
    AuthenticateAccountUseCase,
  ],
})
export class AuthenticationModule {}
