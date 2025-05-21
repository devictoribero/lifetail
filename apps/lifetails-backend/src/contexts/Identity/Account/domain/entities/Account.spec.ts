import { Account } from './Account';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { AccountDeletedDomainEvent } from '../events/AccountDeletedDomainEvent';
import { AccountCreatedDomainEvent } from '../events/AccountCreatedDomainEvent';
import { AccountObjectMother } from './AccountObjectMother.spec';

describe('Account', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Creation', () => {
    it('should create an Account instance and record a AccountCreatedDomainEvent', () => {
      // Arrange & Act
      const email = new EmailValueObject(faker.internet.email());
      const password = new PasswordHashValueObject(faker.internet.password());

      const account = AccountObjectMother.create({ email, password });

      // Assert
      expect(account).toBeInstanceOf(Account);
      expect(account.getId()).toBeInstanceOf(UUID);
      expect(account.getEmail().equals(email)).toBe(true);
      expect(account.getPassword().equals(password)).toBe(true);
      expect(account.getCreatedAt()).toBeInstanceOf(DateValueObject);
      expect(account.getDeletedAt()).toBeNull();
      const events = account.pullDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0]).toBeInstanceOf(AccountCreatedDomainEvent);
      expect(events).toEqual([
        {
          eventName: 'account.created',
          aggregateId: account.getId().toString(),
          eventId: events[0].eventId,
          occurredOn: events[0].occurredOn,
          email: email.toString(),
        },
      ]);
    });
  });

  describe('Serialization', () => {
    it('should serialize to primitives an Account instance', () => {
      // Arrange
      const account = AccountObjectMother.create();

      // Act
      const primitives = account.toPrimitives();

      // Assert
      expect(primitives).toEqual({
        id: account.getId().toString(),
        email: account.getEmail().toString(),
        password: account.getPassword().toString(),
        createdAt: account.getCreatedAt().toISOString(),
        deletedAt: null,
      });
    });

    it('should unserialize from primitives an Account instance', () => {
      // Arrange
      const id = faker.string.uuid();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const createdAt = faker.date.recent();
      const deletedAt = faker.date.recent();

      // Act
      const account = AccountObjectMother.fromPrimitives({
        id,
        email,
        password,
        createdAt,
        deletedAt,
      });

      // Assert
      expect(account).toBeInstanceOf(Account);
      expect(account.getId().toString()).toBe(id.toString());
      expect(account.getEmail().toString()).toBe(email.toString());
      expect(account.getPassword().toString()).toBe(password.toString());
      expect(account.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
      expect(account.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('can mark an account as deleted and AccountDeletedDomainEvent should be recorded', () => {
      // Arrange
      const account = AccountObjectMother.create();
      // Pulling domain events to clean up the events prev. to mark the instance as deleted
      account.pullDomainEvents();

      // Act
      account.markAsDeleted();

      // Assert
      expect(account.getDeletedAt()).not.toBeNull();
      const events = account.pullDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0]).toBeInstanceOf(AccountDeletedDomainEvent);
      expect(events[0]).toEqual({
        eventName: 'account.deleted',
        aggregateId: account.getId().toString(),
        eventId: events[0].eventId,
        occurredOn: events[0].occurredOn,
        email: account.getEmail().toString(),
      });
    });
  });
});
