import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { AccountCreatedDomainEvent } from '../AccountCreatedDomainEvent';
import { AccountDeletedDomainEvent } from '../AccountDeletedDomainEvent';

export class Account extends AggregateRoot {
  private readonly id: UUID;
  private readonly email: EmailValueObject;
  private readonly password: PasswordHashValueObject;
  private readonly createdAt: DateValueObject;
  private deletedAt: DateValueObject | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(
    id: UUID,
    email: EmailValueObject,
    password: PasswordHashValueObject,
    createdAt: DateValueObject,
    deletedAt: DateValueObject | null = null,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  // Use to create the entity from the domain
  static create(email: EmailValueObject, password: PasswordHashValueObject): Account {
    const id = UUID.create();
    const createdAt = new DateValueObject(new Date());

    const account = new Account(id, email, password, createdAt);
    account.record(
      new AccountCreatedDomainEvent({ aggregateId: id.toString(), email: email.toString() }),
    );

    return account;
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives(
    id: string,
    email: string,
    password: string,
    createdAt: Date,
    deletedAt: Date | null,
  ): Account {
    return new Account(
      new UUID(id),
      new EmailValueObject(email),
      new PasswordHashValueObject(password),
      new DateValueObject(createdAt),
      deletedAt ? new DateValueObject(deletedAt) : null,
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      email: this.email.toString(),
      password: this.password.toString(),
      createdAt: this.createdAt.toISOString(),
      deletedAt: this.deletedAt?.toISOString() || null,
    };
  }

  markAsDeleted(): void {
    this.deletedAt = new DateValueObject(new Date());
    this.record(
      new AccountDeletedDomainEvent({
        aggregateId: this.id.toString(),
        email: this.email.toString(),
        eventId: UUID.create().toString(),
      }),
    );
  }

  getId(): UUID {
    return this.id;
  }

  getEmail(): EmailValueObject {
    return this.email;
  }

  getPassword(): PasswordHashValueObject {
    return this.password;
  }

  getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  getDeletedAt(): DateValueObject | null {
    return this.deletedAt;
  }
}
