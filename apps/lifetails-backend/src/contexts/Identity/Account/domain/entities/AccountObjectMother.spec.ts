import { faker } from '@faker-js/faker';
import { Account } from './Account';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class AccountObjectMother {
  static create({
    email = new EmailValueObject(faker.internet.email()),
    password = new PasswordHashValueObject(faker.internet.password()),
  }: {
    email?: EmailValueObject;
    password?: PasswordHashValueObject;
  } = {}): Account {
    return Account.create({ email, password });
  }

  static createWith({
    id = UUID.generate(),
    email = new EmailValueObject(faker.internet.email()),
    password = new PasswordHashValueObject(faker.internet.password()),
    createdAt = new DateValueObject(new Date()),
    deletedAt = null,
  }: {
    id?: UUID;
    email?: EmailValueObject;
    password?: PasswordHashValueObject;
    createdAt?: DateValueObject;
    deletedAt?: DateValueObject | null;
  } = {}): Account {
    return new Account({ id, email, password, createdAt, deletedAt });
  }

  static fromPrimitives(params: {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    deletedAt: Date | null;
  }): Account {
    return Account.fromPrimitives(params);
  }
}

describe('AccountObjectMother', () => {
  it('should create an account with default values', () => {
    const email = new EmailValueObject('test@example.com');
    const password = new PasswordHashValueObject('hashedPassword123');

    const account = AccountObjectMother.create({ email, password });

    expect(account.getId()).not.toBeNull();
    expect(account.getEmail().equals(email)).toBe(true);
    expect(account.getPassword().equals(password)).toBe(true);
    expect(account.getCreatedAt()).not.toBeNull();
    expect(account.getDeletedAt()).toBeNull();
  });

  it('should create an account with custom values', () => {
    const id = UUID.generate();
    const email = new EmailValueObject('test@example.com');
    const password = new PasswordHashValueObject('hashedPassword123');
    const createdAt = new DateValueObject(new Date());

    const account = AccountObjectMother.createWith({ id, email, password, createdAt });

    expect(account.getId().equals(id)).toBe(true);
    expect(account.getEmail().equals(email)).toBe(true);
    expect(account.getPassword().equals(password)).toBe(true);
    expect(account.getCreatedAt().equals(createdAt)).toBe(true);
    expect(account.getDeletedAt()).toBeNull();
  });

  it('should create an account from primitives', () => {
    const id = faker.string.uuid();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const createdAt = faker.date.recent();
    const deletedAt = faker.date.recent();

    const account = AccountObjectMother.fromPrimitives({
      id,
      email,
      password,
      createdAt,
      deletedAt,
    });

    expect(account.getId().equals(new UUID(id))).toBe(true);
    expect(account.getEmail().equals(new EmailValueObject(email))).toBe(true);
    expect(account.getPassword().equals(new PasswordHashValueObject(password))).toBe(true);
    expect(account.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
    expect(account.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBe(true);
  });
});
