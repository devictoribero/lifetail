import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { User } from './User';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';

describe('User', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create a User instance', () => {
    const id = UUID.generate();
    const accountId = UUID.generate();
    const nickname = new StringValueObject(faker.person.firstName());
    const createdAt = new DateValueObject(faker.date.past());
    const preferredLanguage = LanguageCode.English;

    const user = new User({ id, accountId, nickname, createdAt, preferredLanguage });

    expect(user).toBeDefined();
    expect(user.getId()).toBe(id);
    expect(user.getAccountId()).toBe(accountId);
    expect(user.getNickname()).toBe(nickname);
    expect(user.getCreatedAt()).toBe(createdAt);
    expect(user.getPreferredLanguage()).toBe(preferredLanguage);
  });

  it('should create a User instance with the create named constructor method', () => {
    const id = UUID.generate();
    const accountId = UUID.generate();
    const nickname = new StringValueObject(faker.person.firstName());

    const user = User.create({ id, accountId, nickname });

    expect(user).toBeDefined();
    expect(user.getId()).toBe(id);
    expect(user.getAccountId()).toBe(accountId);
    expect(user.getNickname()).toBe(nickname);
    expect(user.getCreatedAt()).toBeInstanceOf(DateValueObject);
    expect(user.getPreferredLanguage()).toBe(LanguageCode.English);
    expect(user.getUpdatedAt()).toBeNull();
    expect(user.getDeletedAt()).toBeNull();
  });

  it('should convert the User to primitive values', () => {
    const id = UUID.generate();
    const accountId = UUID.generate();
    const nickname = new StringValueObject(faker.person.firstName());

    const user = User.create({ id, accountId, nickname });

    const primitives = user.toPrimitives();
    expect(primitives).toEqual({
      id: id.toString(),
      accountId: accountId.toString(),
      nickname: nickname.toString(),
      preferredLanguage: 'EN',
      createdAt: expect.any(String),
      updatedAt: null,
      deletedAt: null,
    });
  });
});
