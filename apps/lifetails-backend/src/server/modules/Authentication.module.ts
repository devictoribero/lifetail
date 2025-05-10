import { Module } from '@nestjs/common';
// domain imports
import { PasswordHasher } from 'src/contexts/Lifetails/Authentication/domain/services/PasswordHasher';
// Application imports
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
// Infrastructure imports
import { AccountInMemoryRepository } from 'src/contexts/Lifetails/Authentication/infrastructure/AccountInMemoryRepository';
// Constants
import { ACCOUNT_REPOSITORY } from 'src/contexts/Lifetails/Authentication/domain/repositories/AccountRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateAccountCommandHandler,
    PasswordHasher,
    AuthenticateAccountCommandHandler,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountInMemoryRepository,
    },
  ],
  exports: [CreateAccountCommandHandler, AuthenticateAccountCommandHandler],
})
export class AuthenticationModule {}
