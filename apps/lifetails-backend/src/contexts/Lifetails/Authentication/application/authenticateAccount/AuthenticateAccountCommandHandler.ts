import { PasswordHashValueObject } from 'src/contexts/Lifetails/Shared/domain/PasswordHashValueObject';
import { Account } from '../../domain/entities/Account';
import { InvalidCredentialsException } from '../../domain/exceptions/InvalidCredentialsException';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { AuthenticateAccountCommand } from './AuthenticateAccountCommand';

export class AuthenticateAccountCommandHandler {
  constructor(
    private readonly repository: AccountRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(command: AuthenticateAccountCommand): Promise<string> {
    const account = await this.getAccount(command.email);

    await this.ensurePasswordIsValid(command.password, account.getPassword());

    return account.getId().toString();
  }

  private async getAccount(email: string): Promise<Account> {
    const account = await this.repository.findByEmail(email);
    if (!account) {
      throw new InvalidCredentialsException();
    }

    return account;
  }

  private async ensurePasswordIsValid(
    password: string,
    passwordHashed: PasswordHashValueObject,
  ): Promise<void> {
    const isPasswordValid = await this.hasher.compare(password, passwordHashed);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }
  }
}
