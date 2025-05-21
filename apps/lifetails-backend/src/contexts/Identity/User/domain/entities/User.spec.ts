import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { User } from './User';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';
import { UserObjectMother } from './UserObjectMother.spec';

describe('User', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create a User instance', () => {
    const nickname = new StringValueObject(faker.person.firstName());

    const user = UserObjectMother.create({ nickname });

    expect(user).toBeDefined();
    expect(user.getId()).not.toBeNull();
    expect(user.getAccountId()).not.toBeNull();
    expect(user.getNickname().equals(nickname)).toBe(true);
    expect(user.getCreatedAt()).not.toBeNull();
    expect(user.getPreferredLanguage()).toBe(LanguageCode.English);
    expect(user.getUpdatedAt()).toBeNull();
    expect(user.getDeletedAt()).toBeNull();
    const events = user.pullDomainEvents();
    expect(events).toHaveLength(0);
  });

  it('should serialize a User instance', () => {
    const user = UserObjectMother.create();

    const primitives = user.toPrimitives();

    expect(primitives).toEqual({
      id: user.getId().toString(),
      accountId: user.getAccountId().toString(),
      nickname: user.getNickname().toString(),
      preferredLanguage: 'EN',
      createdAt: expect.any(String),
      updatedAt: null,
      deletedAt: null,
    });
  });

  it('can change the preferred language', () => {
    const user = UserObjectMother.createWith({
      preferredLanguage: LanguageCode.English,
    });

    user.changePreferredLanguageTo(LanguageCode.Spanish);

    expect(user.getPreferredLanguage()).toBe(LanguageCode.Spanish);
  });
});
