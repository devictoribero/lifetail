import { User } from '../domain/entities/User';
import { UserInMemoryRepository } from './UserInMemoryRepository';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { faker } from '@faker-js/faker';

function createUser(
  id = faker.string.uuid(),
  accountId = faker.string.uuid(),
  nickname = faker.person.firstName(),
): User {
  return User.create(new UUID(id), new UUID(accountId), new StringValueObject(nickname));
}

describe('UserInMemoryRepository', () => {
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
  });

  afterEach(() => {
    // @todo: This is a hack to clear the repository after each test.
    repository.clear();
  });

  it('should save a new user', async () => {
    // Arrange
    const user = createUser();

    // Act
    await repository.save(user);

    // Assert
    const savedUsers = repository.getAll();
    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0]).toBe(user);
  });

  it('should update an existing user', async () => {
    // Arrange
    const id = faker.string.uuid();
    const accountId = faker.string.uuid();
    const oldUser = createUser(id, accountId);
    await repository.save(oldUser);

    // Act
    const updatedUser = createUser(id, accountId, 'Updated Name');
    await repository.save(updatedUser);

    // Assert
    const savedUsers = repository.getAll();
    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0]).toBe(updatedUser);
    expect(savedUsers[0]).not.toBe(oldUser);
  });

  describe('getByAccountId', () => {
    it('should return null when user does not exist', async () => {
      // Arrange
      const accountId = faker.string.uuid();

      // Act
      const result = await repository.getByAccountId(new UUID(accountId));

      // Assert
      expect(result).toBeNull();
    });

    it('should return a user when it exists', async () => {
      // Arrange
      const accountId = faker.string.uuid();
      const user = createUser(faker.string.uuid(), accountId);
      await repository.save(user);

      // Act
      const result = await repository.getByAccountId(new UUID(accountId));

      // Assert
      expect(result).toBe(user);
    });
  });
});
