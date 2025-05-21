import { CreateUserCommandHandler } from './CreateUserCommandHandler';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { faker } from '@faker-js/faker';
import { CreateUserCommand } from './CreateUserCommand';
import { GetUserService } from '../../domain/services/GetUserService';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UserAlreadyExistsException } from '../../domain/exceptions/UserAlreadyExistsException';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';

describe('CreateUserCommandHandler', () => {
  let getUserService: jest.Mocked<GetUserService>;
  let repository: UserRepository;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    getUserService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserService>;

    repository = {
      save: jest.fn(),
      getByAccountId: jest.fn(),
      getById: jest.fn(),
    };

    commandHandler = new CreateUserCommandHandler(getUserService, repository);
  });

  it('should throw UserAlreadyExistsException when the user already exists', async () => {
    // Arrange
    const accountId = faker.string.uuid();
    const id = faker.string.uuid();
    const nickname = faker.person.firstName();
    getUserService.execute.mockResolvedValue(
      new User({
        id: new UUID(id),
        accountId: new UUID(accountId),
        nickname: new StringValueObject(nickname),
        createdAt: new DateValueObject(new Date()),
        preferredLanguage: LanguageCode.English,
      }),
    );

    // Act
    const command = new CreateUserCommand(accountId, id, nickname);
    expect(async () => await commandHandler.handle(command)).rejects.toThrow(
      UserAlreadyExistsException,
    );
  });

  it('should create a user', async () => {
    // Arrange
    const id = faker.string.uuid();
    const accountId = faker.string.uuid();
    const nickname = faker.person.firstName();
    const command = new CreateUserCommand(accountId, id, nickname);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.save).toHaveBeenCalledTimes(1);
    const savedUser = (repository.save as jest.Mock).mock.calls[0][0] as User;
    expect(savedUser).toBeInstanceOf(User);
    expect(savedUser.toPrimitives()).toEqual({
      id,
      accountId,
      nickname,
      preferredLanguage: LanguageCode.English.toString(),
      createdAt: expect.any(String),
      updatedAt: null,
      deletedAt: null,
    });
  });
});
