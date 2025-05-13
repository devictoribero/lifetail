import { Account } from '../../../Authentication/domain/entities/Account';
import { AccountRepository } from '../../../Authentication/domain/repositories/AccountRepository';
import { PasswordHasher } from '../../../Authentication/domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from '../../../Authentication/domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from './CreateAccountCommand';
import { Injectable, Inject } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from '../../../Authentication/domain/repositories/AccountRepository';
import { EventBus, EVENT_BUS } from 'src/contexts/Lifetails/Shared/domain/EventBus';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { EmailValueObject } from 'src/contexts/Lifetails/Shared/domain/EmailValueObject';

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
