import { Account } from '../../domain/entities/Account';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from '../../domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from './CreateAccountCommand';

export class CreateAccountUseCase {
  constructor(
    private readonly repository: AccountRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(command: CreateAccountCommand): Promise<Account> {
    await this.ensureEmailIsUnique(command.email);

    const passwordHashed = await this.hasher.hash(command.password);
    const account = Account.create(new EmailValueObject(command.email), passwordHashed);

    await this.repository.save(account);

    return account;
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const existingAccount = await this.repository.findByEmail(email);
    if (existingAccount) {
      throw new EmailAlreadyInUseException();
    }
  }
}
