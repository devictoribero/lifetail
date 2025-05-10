import { Account } from '../../domain/entities/Account';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from '../../domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from './CreateAccountCommand';

export class CreateAccountCommandHandler {
  constructor(
    private readonly repository: AccountRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(command: CreateAccountCommand): Promise<{ id: string }> {
    const email = new EmailValueObject(command.email);
    await this.ensureEmailIsUnique(email);

    const passwordHashed = await this.hasher.hash(command.password);
    const account = Account.create(new EmailValueObject(command.email), passwordHashed);

    await this.repository.save(account);

    return { id: account.getId().toString() };
  }

  private async ensureEmailIsUnique(email: EmailValueObject): Promise<void> {
    const existingAccount = await this.repository.findByEmail(email);
    if (existingAccount) {
      throw new EmailAlreadyInUseException();
    }
  }
}
