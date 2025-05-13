import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { Account } from '../../domain/entities/Account';
import { InvalidCredentialsException } from '../../domain/exceptions/InvalidCredentialsException';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { AuthenticateAccountCommand } from './AuthenticateAccountCommand';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { Injectable, Inject } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from '../../domain/repositories/AccountRepository';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

@Injectable()
export class AuthenticateAccountCommandHandler {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(command: AuthenticateAccountCommand): Promise<string> {
    const email = new EmailValueObject(command.email);
    const account = await this.getAccount(email);

    await this.ensurePasswordIsValid(
      new StringValueObject(command.password),
      account.getPassword(),
    );

    return account.getId().toString();
  }

  private async getAccount(email: EmailValueObject): Promise<Account> {
    const account = await this.repository.findByEmail(email);
    if (!account) {
      throw new InvalidCredentialsException();
    }

    return account;
  }

  private async ensurePasswordIsValid(
    password: StringValueObject,
    passwordHashed: PasswordHashValueObject,
  ): Promise<void> {
    const isPasswordValid = await this.hasher.compare(password, passwordHashed);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }
  }
}
