import { ChangeUserPreferredLanguageCommandHandler } from './ChangeUserPreferredLanguageCommandHandler';
import { ChangeUserPreferredLanguageCommand } from './ChangeUserPreferredLanguageCommand';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { faker } from '@faker-js/faker';

describe('ChangeUserPreferredLanguageCommandHandler', () => {
  let repository: jest.Mocked<UserRepository>;
  let commandHandler: ChangeUserPreferredLanguageCommandHandler;
  let userId: string;
  let accountId: string;
  let mockUser: User;

  beforeEach(() => {
    userId = faker.string.uuid();
    accountId = faker.string.uuid();

    // Create a mock user with English as default language
    mockUser = new User(
      new UUID(userId),
      new UUID(accountId),
      new StringValueObject(faker.person.firstName()),
      new DateValueObject(new Date('2025-01-01')),
      LanguageCode.English,
    );

    // Setup repository mock
    repository = {
      getById: jest.fn(),
      save: jest.fn(),
      getByAccountId: jest.fn(),
    } as jest.Mocked<UserRepository>;

    // Setup repository's getById to return our mockUser
    repository.getById.mockResolvedValue(mockUser);

    // Create the command handler
    commandHandler = new ChangeUserPreferredLanguageCommandHandler(repository);
  });

  it('should throw UserNotFoundException when the user does not exist', async () => {
    // Arrange
    repository.getById.mockResolvedValue(null);
    const command = new ChangeUserPreferredLanguageCommand(userId, 'es');

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(UserNotFoundException);
    expect(repository.getById).toHaveBeenCalledWith(new UUID(userId));
  });

  it('should change the user preferred language to Spanish', async () => {
    // Arrange
    const command = new ChangeUserPreferredLanguageCommand(userId, 'es');

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.save).toHaveBeenCalledTimes(1);
    const savedUser = repository.save.mock.calls[0][0] as User;
    expect(savedUser.getPreferredLanguage()).toBe(LanguageCode.Spanish);
  });

  it('should maintain the existing language when the provided language code is invalid', async () => {
    // Arrange
    const mockUserWithSpanish = new User(
      new UUID(userId),
      new UUID(accountId),
      new StringValueObject(faker.person.firstName()),
      new DateValueObject(new Date()),
      LanguageCode.Spanish,
    );
    repository.getById.mockResolvedValue(mockUserWithSpanish);

    const command = new ChangeUserPreferredLanguageCommand(userId, 'invalid-language');

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow();
    expect(repository.save).not.toHaveBeenCalled();
  });
});
