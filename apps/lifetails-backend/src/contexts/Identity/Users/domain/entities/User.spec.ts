import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { User } from './User';
import { Language } from 'src/contexts/Shared/domain/Language';

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
    const preferredLanguage = Language.English;

    const user = new User(id, accountId, nickname, createdAt, preferredLanguage);

    expect(user).toBeDefined();
    expect(user.getId()).toBe(id);
    expect(user.getAccountId()).toBe(accountId);
    expect(user.getNickname()).toBe(nickname);
    expect(user.getCreatedAt()).toBe(createdAt);
    expect(user.getPreferredLanguage()).toBe(preferredLanguage);
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
    expect(user.getPreferredLanguage()).toBe(Language.English);
  });

  it('should create a User instance with a custom preferred language', () => {
    const id = UUID.create();
    const accountId = UUID.create();
    const nickname = new StringValueObject(faker.person.firstName());
    const preferredLanguage = Language.Spanish;

    const user = User.create(id, accountId, nickname, preferredLanguage);

    expect(user).toBeDefined();
    expect(user.getPreferredLanguage()).toBe(Language.Spanish);
  });

  it('should convert the User to primitive values', () => {
    const id = UUID.create();
    const accountId = UUID.create();
    const nickname = new StringValueObject(faker.person.firstName());
    const createdAt = new DateValueObject(faker.date.past());
    const preferredLanguage = Language.English;

    const user = new User(id, accountId, nickname, createdAt, preferredLanguage);

    const primitives = user.toPrimitives();
    expect(primitives).toEqual({
      id: id.toString(),
      accountId: accountId.toString(),
      nickname: nickname.toString(),
      createdAt: createdAt.toISOString(),
      preferredLanguage: preferredLanguage.toString(),
    });
  });
});
