import { Account } from '../../domain/entities/Account';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from '../../domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from './CreateAccountCommand';
import { Injectable, Inject } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from '../../domain/repositories/AccountRepository';
import { EventBus, EVENT_BUS } from '../../../Shared/domain/EventBus';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';

@Injectable()
export class CreateAccountCommandHandler {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
    private readonly hasher: PasswordHasher,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAccountCommand): Promise<{ id: string }> {
    const email = new EmailValueObject(command.email);
    const password = new StringValueObject(command.password);

    await this.ensureEmailIsUnique(email);

    const passwordHashed = await this.hasher.hash(password);
    const account = Account.create(email, passwordHashed);

    await this.repository.save(account);
    await this.eventBus.publish(account.pullDomainEvents());

    return { id: account.getId().toString() };
  }

  private async ensureEmailIsUnique(email: EmailValueObject): Promise<void> {
    const existingAccount = await this.repository.findByEmail(email);
    if (existingAccount) {
      throw new EmailAlreadyInUseException();
    }
  }
}
