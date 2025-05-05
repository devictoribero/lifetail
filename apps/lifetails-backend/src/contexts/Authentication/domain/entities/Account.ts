import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UUID } from '../../../Shared/domain/UUID';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class Account extends AggregateRoot {
  private readonly id: UUID;
  private readonly email: EmailValueObject;
  private readonly password: PasswordHashValueObject;
  private readonly createdAt: DateValueObject;

  private constructor(
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

  static create(email: EmailValueObject, password: PasswordHashValueObject): Account {
    const id = UUID.create();
    const createdAt = new DateValueObject(new Date());

    const account = new Account(id, email, password, createdAt);

    return account;
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
