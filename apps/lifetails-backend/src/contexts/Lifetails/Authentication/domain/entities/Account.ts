import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UUID } from '../../../Shared/domain/UUID';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Lifetails/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';

export class Account extends AggregateRoot {
  private readonly id: UUID;
  private readonly email: EmailValueObject;
  private readonly password: PasswordHashValueObject;
  private readonly createdAt: DateValueObject;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(
    id: UUID,
    email: EmailValueObject,
    password: PasswordHashValueObject,
    createdAt: DateValueObject,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  // Use to create the entity from the domain
  static create(email: EmailValueObject, password: PasswordHashValueObject): Account {
    const id = UUID.create();
    const createdAt = new DateValueObject(new Date());

    const account = new Account(id, email, password, createdAt);

    return account;
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives(id: string, email: string, password: string, createdAt: Date): Account {
    return new Account(
      new UUID(id),
      new EmailValueObject(email),
      new PasswordHashValueObject(password),
      new DateValueObject(createdAt),
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      email: this.email.toString(),
      password: this.password.toString(),
      createdAt: this.createdAt,
    };
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
}
