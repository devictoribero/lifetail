import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { User } from './User';

describe('User', () => {
  let id: UUID;
  let accountId: UUID;
  let name: StringValueObject;
  let nickname: StringValueObject;
  let gender: StringValueObject;
  let birthDate: DateValueObject;
  let createdAt: DateValueObject;

  beforeEach(() => {
    jest.useFakeTimers();
    id = new UUID(faker.string.uuid());
    accountId = new UUID(faker.string.uuid());
    name = new StringValueObject(faker.person.fullName());
    nickname = new StringValueObject(faker.person.firstName());
    gender = new StringValueObject('Male');
    birthDate = new DateValueObject(faker.date.birthdate());
    createdAt = new DateValueObject(faker.date.past());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create a User instance', () => {
    const user = new User(id, accountId, name, nickname, gender, birthDate, createdAt);

    expect(user).toBeDefined();
    expect(user.getId()).toBe(id);
    expect(user.getAccountId()).toBe(accountId);
    expect(user.getName()).toBe(name);
    expect(user.getNickname()).toBe(nickname);
    expect(user.getGender()).toBe(gender);
    expect(user.getCreatedAt()).toBe(createdAt);
  });

  it('should convert the User to primitive values', () => {
    const user = new User(id, accountId, name, nickname, gender, birthDate, createdAt);
    const primitives = user.toPrimitives();

    expect(primitives).toEqual({
      id: id.toString(),
      accountId: accountId.toString(),
      name: name.toString(),
      nickname: nickname.toString(),
      gender: gender.toString(),
      birthDate: birthDate.toISOString(),
      createdAt: createdAt.toISOString(),
    });
  });
});
