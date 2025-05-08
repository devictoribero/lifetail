import { Module } from '@nestjs/common';
// domain imports
import { PasswordHasher } from 'src/contexts/Lifetails/Authentication/domain/services/PasswordHasher';
// Application imports
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
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
  provide: AuthenticateAccountCommandHandler,
  useFactory: (repository: AccountInMemoryRepository, hasher: PasswordHasher) => {
    return new AuthenticateAccountCommandHandler(repository, hasher);
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
    AuthenticateAccountCommandHandler,
  ],
})
export class AuthenticationModule {}
