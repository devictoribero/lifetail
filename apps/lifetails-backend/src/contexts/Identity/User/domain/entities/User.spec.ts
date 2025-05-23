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

  describe('Creation', () => {
    it('should create a User instance and no events should be recorded', () => {
      const nickname = new StringValueObject(faker.person.firstName());

      const user = UserObjectMother.create({ nickname });

      expect(user).toBeDefined();
      expect(user.getId()).not.toBeNull();
      expect(user.getAccountId()).not.toBeNull();
      expect(user.getNickname().equals(nickname)).toBe(true);
      expect(user.getCreatedAt()).not.toBeNull();
      expect(user.getPreferredLanguage().equals(LanguageCode.English)).toBe(true);
      expect(user.getUpdatedAt()).toBeNull();
      expect(user.getDeletedAt()).toBeNull();
      const events = user.pullDomainEvents();
      expect(events).toHaveLength(0);
    });
  });

  describe('Serialization', () => {
    it('should serialize to primitives a User instance', () => {
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

    it('should unserialize from primitives a User instance', () => {
      const id = faker.string.uuid();
      const accountId = faker.string.uuid();
      const nickname = faker.person.firstName();
      const preferredLanguage = 'EN';
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

      expect(user).toBeInstanceOf(User);
      expect(user.getId().toString()).toBe(id.toString());
      expect(user.getAccountId().toString()).toBe(accountId.toString());
      expect(user.getNickname().toString()).toBe(nickname.toString());
      expect(user.getPreferredLanguage().equals(LanguageCode.English)).toBe(true);
      expect(user.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
      expect(user.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('can change the preferred language', () => {
      const user = UserObjectMother.createWith({
        preferredLanguage: LanguageCode.English,
      });

      user.changePreferredLanguageTo(LanguageCode.Spanish);

      expect(user.getPreferredLanguage().equals(LanguageCode.Spanish)).toBe(true);
    });
  });
});
