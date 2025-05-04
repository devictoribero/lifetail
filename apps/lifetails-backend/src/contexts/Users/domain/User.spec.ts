import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { User } from './User';
import { faker } from '@faker-js/faker';

describe('User', () => {
  let validId: UUID;
  let validAccountId: UUID;
  let validName: StringValueObject;
  let validNickname: StringValueObject;
  let validGender: StringValueObject;
  let validCreatedAt: Date;
  let user: User;

  beforeEach(() => {
    validId = new UUID(faker.string.uuid());
    validAccountId = new UUID(faker.string.uuid());
    validName = new StringValueObject(faker.person.fullName());
    validNickname = new StringValueObject(faker.person.firstName());
    validGender = new StringValueObject('Male');
    validCreatedAt = new Date();

    user = new User(validId, validAccountId, validName, validNickname, validGender, validCreatedAt);
  });

  describe('constructor', () => {
    it('should create a User instance', () => {
      expect(user).toBeDefined();
      expect(user.getId()).toBe(validId);
      expect(user.getAccountId()).toBe(validAccountId);
      expect(user.getName()).toBe(validName);
      expect(user.getNickname()).toBe(validNickname);
      expect(user.getGender()).toBe(validGender);
      expect(user.getCreatedAt()).toBe(validCreatedAt);
    });
  });

  describe('create', () => {
    it('should create a new User instance with generated id and createdAt date', () => {
      // Mock UUID.create to return a fixed value for testing
      const mockedUUID = new UUID(faker.string.uuid());
      jest.spyOn(UUID, 'create').mockReturnValue(mockedUUID);

      // Mock Date to return a fixed value for testing
      const mockedDate = new Date('2023-01-01T00:00:00.000Z');
      jest.useFakeTimers().setSystemTime(mockedDate);

      const newUser = User.create(validAccountId, validName, validNickname, validGender);

      expect(newUser).toBeInstanceOf(User);
      expect(newUser.getId()).toBe(mockedUUID);
      expect(newUser.getAccountId()).toBe(validAccountId);
      expect(newUser.getName()).toBe(validName);
      expect(newUser.getNickname()).toBe(validNickname);
      expect(newUser.getGender()).toBe(validGender);
      expect(newUser.getCreatedAt()).toEqual(mockedDate);

      // Restore mocks
      jest.restoreAllMocks();
      jest.useRealTimers();
    });
  });

  it('should return the correct id', () => {
    expect(user.getId()).toBe(validId);
  });

  it('should return the correct accountId', () => {
    expect(user.getAccountId()).toBe(validAccountId);
  });

  it('should return the correct name', () => {
    expect(user.getName()).toBe(validName);
  });

  it('should return the correct nickname', () => {
    expect(user.getNickname()).toBe(validNickname);
  });

  it('should return the correct gender', () => {
    expect(user.getGender()).toBe(validGender);
  });

  it('should return the correct createdAt date', () => {
    expect(user.getCreatedAt()).toBe(validCreatedAt);
  });

  describe('toPrimitives', () => {
    it('should convert the User to primitive values', () => {
      const primitives = user.toPrimitives();

      expect(primitives).toEqual({
        id: validId.toString(),
        accountId: validAccountId.toString(),
        name: validName.toString(),
        nickname: validNickname.toString(),
        gender: validGender.toString(),
        createdAt: validCreatedAt,
      });
    });
  });
});
