import { Account } from './Account';
import { UUID } from '../../../Shared/domain/UUID';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Lifetails/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('Account', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create an Account instance', () => {
    // Arrange & Act
    const id = new UUID(faker.string.uuid());
    const email = new EmailValueObject(faker.internet.email());
    const password = new PasswordHashValueObject(faker.internet.password());
    const createdAt = new DateValueObject(faker.date.recent());

    const account = new Account(id, email, password, createdAt);

    // Assert
    expect(account).toBeInstanceOf(Account);
    expect(account.getId()).toBe(id);
    expect(account.getEmail()).toBe(email);
    expect(account.getPassword()).toBe(password);
    expect(account.getCreatedAt()).toBe(createdAt);
  });

  it('should record an AccountCreatedDomainEvent when an Account is created', () => {
    // Arrange
    const email = new EmailValueObject(faker.internet.email());
    const password = new PasswordHashValueObject(faker.internet.password());

    const account = Account.create(email, password);

    // Assert
    expect(account.pullDomainEvents()).toEqual([
      expect.objectContaining({
        aggregateId: account.getId().toString(),
        email: account.getEmail().toString(),
      }),
    ]);
  });

  it('should create an Account instance with named constructor method', () => {
    // Arrange
    const email = new EmailValueObject(faker.internet.email());
    const password = new PasswordHashValueObject(faker.internet.password());

    // Act
    const account = Account.create(email, password);

    // Assert
    expect(account).toBeInstanceOf(Account);
    expect(account.getId()).toBeInstanceOf(UUID);
    expect(account.getEmail()).toBe(email);
    expect(account.getPassword()).toBe(password);
    expect(account.getCreatedAt()).toBeInstanceOf(DateValueObject);
  });

  it('should create an Account instance from primitives', () => {
    // Arrange
    const id = faker.string.uuid();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const createdAt = faker.date.recent();

    // Act
    const account = Account.fromPrimitives(id, email, password, createdAt);

    // Assert
    expect(account).toBeInstanceOf(Account);
    expect(account.getId().toString()).toBe(id.toString());
    expect(account.getEmail().toString()).toBe(email.toString());
    expect(account.getPassword().toString()).toBe(password.toString());
    expect(account.getCreatedAt().toISOString()).toEqual(createdAt.toISOString());
  });

  it('should convert Account instance to primitives', () => {
    // Arrange
    const id = new UUID(faker.string.uuid());
    const email = new EmailValueObject(faker.internet.email());
    const password = new PasswordHashValueObject(faker.internet.password());
    const createdAt = new DateValueObject(faker.date.recent());
    const account = new Account(id, email, password, createdAt);

    // Act
    const primitives = account.toPrimitives();

    // Assert
    expect(primitives).toEqual({
      id: id.toString(),
      email: email.toString(),
      password: password.toString(),
      createdAt: createdAt.toISOString(),
    });
  });
});
