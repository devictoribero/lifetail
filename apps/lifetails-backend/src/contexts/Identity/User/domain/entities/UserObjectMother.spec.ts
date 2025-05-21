import { faker } from '@faker-js/faker';
import { User } from './User';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';

export class UserObjectMother {
  static create({
    nickname = new StringValueObject(faker.person.firstName()),
  }: {
    nickname?: StringValueObject;
  } = {}): User {
    const id = UUID.generate();
    const accountId = UUID.generate();

    return User.create({ id, accountId, nickname });
  }

  static createWith({
    id = UUID.generate(),
    accountId = UUID.generate(),
    nickname = new StringValueObject(faker.person.firstName()),
    preferredLanguage = LanguageCode.English,
    createdAt = new DateValueObject(new Date()),
    updatedAt = null,
    deletedAt = null,
  }: {
    id?: UUID;
    accountId?: UUID;
    nickname?: StringValueObject;
    preferredLanguage?: LanguageCode;
    createdAt?: DateValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  } = {}): User {
    return new User({
      id,
      accountId,
      nickname,
      preferredLanguage,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }

  static fromPrimitives(params: {
    id: string;
    accountId: string;
    nickname: string;
    preferredLanguage: string;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }): User {
    return User.fromPrimitives(params);
  }
}

describe('UserObjectMother', () => {
  it('should create a user with default values', () => {
    const nickname = new StringValueObject('testNickname');

    const user = UserObjectMother.create({ nickname });

    expect(user.getId()).not.toBeNull();
    expect(user.getAccountId()).not.toBeNull();
    expect(user.getNickname().equals(nickname)).toBe(true);
    expect(user.getPreferredLanguage()).toBe(LanguageCode.English);
    expect(user.getCreatedAt()).not.toBeNull();
    expect(user.getUpdatedAt()).toBeNull();
    expect(user.getDeletedAt()).toBeNull();
  });

  it('should create a user with custom values', () => {
    const id = UUID.generate();
    const accountId = UUID.generate();
    const nickname = new StringValueObject('customNickname');
    const preferredLanguage = LanguageCode.Spanish;
    const createdAt = new DateValueObject(new Date());

    const user = UserObjectMother.createWith({
      id,
      accountId,
      nickname,
      preferredLanguage,
      createdAt,
    });

    expect(user.getId().equals(id)).toBe(true);
    expect(user.getAccountId().equals(accountId)).toBe(true);
    expect(user.getNickname().equals(nickname)).toBe(true);
    expect(user.getPreferredLanguage()).toBe(preferredLanguage);
    expect(user.getCreatedAt().equals(createdAt)).toBe(true);
    expect(user.getUpdatedAt()).toBeNull();
    expect(user.getDeletedAt()).toBeNull();
  });

  it('should create a user from primitives', () => {
    const id = faker.string.uuid();
    const accountId = faker.string.uuid();
    const nickname = faker.person.firstName();
    const preferredLanguage = LanguageCode.English.toString();
    const createdAt = faker.date.recent();
    const updatedAt = faker.date.recent();
    const deletedAt = faker.date.recent();

    const user = UserObjectMother.fromPrimitives({
      id,
      accountId,
      nickname,
      preferredLanguage,
      createdAt,
      updatedAt,
      deletedAt,
    });

    expect(user.getId().equals(new UUID(id))).toBe(true);
    expect(user.getAccountId().equals(new UUID(accountId))).toBe(true);
    expect(user.getNickname().equals(new StringValueObject(nickname))).toBe(true);
    expect(user.getPreferredLanguage()).toBe(LanguageCode.English);
    expect(user.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
    expect(user.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBe(true);
    expect(user.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBe(true);
  });
});
