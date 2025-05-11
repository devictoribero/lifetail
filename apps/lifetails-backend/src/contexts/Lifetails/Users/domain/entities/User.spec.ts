import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { User } from './User';

describe('User', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create a User instance', () => {
    const id = UUID.create();
    const accountId = UUID.create();
    const nickname = new StringValueObject(faker.person.firstName());
    const createdAt = new DateValueObject(faker.date.past());

    const user = new User(id, accountId, nickname, createdAt);

    expect(user).toBeDefined();
    expect(user.getId()).toBe(id);
    expect(user.getAccountId()).toBe(accountId);
    expect(user.getNickname()).toBe(nickname);
    expect(user.getCreatedAt()).toBe(createdAt);
  });

  it('should create a User instance with the create named constructor method', () => {
    const id = UUID.create();
    const accountId = UUID.create();
    const nickname = new StringValueObject(faker.person.firstName());

    const user = User.create(id, accountId, nickname);

    expect(user).toBeDefined();
    expect(user.getId()).toBe(id);
    expect(user.getAccountId()).toBe(accountId);
    expect(user.getNickname()).toBe(nickname);
    expect(user.getCreatedAt()).toBeInstanceOf(DateValueObject);
  });

  it('should convert the User to primitive values', () => {
    const id = UUID.create();
    const accountId = UUID.create();
    const nickname = new StringValueObject(faker.person.firstName());
    const createdAt = new DateValueObject(faker.date.past());

    const user = new User(id, accountId, nickname, createdAt);

    const primitives = user.toPrimitives();
    expect(primitives).toEqual({
      id: id.toString(),
      accountId: accountId.toString(),
      nickname: nickname.toString(),
      createdAt: createdAt.toISOString(),
    });
  });
});
