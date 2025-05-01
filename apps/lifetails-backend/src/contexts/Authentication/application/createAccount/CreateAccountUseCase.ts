import { Account } from '../../domain/entities/Account';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from '../../domain/exceptions/EmailAlreadyInUseException';

export class CreateAccountCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class CreateAccountUseCase {
  constructor(
    private readonly repository: AccountRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const existingAccount = await this.repository.findByEmail(command.email);

    if (existingAccount) {
      throw new EmailAlreadyInUseException();
    }

    const passwordHashed = await this.hasher.hash(command.password);
    const account = Account.create(new EmailValueObject(command.email), passwordHashed);

    await this.repository.save(account);
  }
}
