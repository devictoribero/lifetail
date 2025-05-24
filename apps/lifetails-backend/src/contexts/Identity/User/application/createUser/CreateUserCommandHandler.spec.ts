import { CreateUserCommandHandler } from './CreateUserCommandHandler';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { GetUserService } from '../../domain/services/GetUserService';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UserAlreadyExistsException } from '../../domain/exceptions/UserAlreadyExistsException';
import { UserObjectMother } from '../../domain/entities/UserObjectMother.spec';

describe('CreateUserCommandHandler', () => {
  let getUserService: jest.Mocked<GetUserService>;
  let repository: jest.Mocked<UserRepository>;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    getUserService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserService>;

    repository = {
      save: jest.fn(),
      getByAccountId: jest.fn(),
      getById: jest.fn(),
    } as jest.Mocked<UserRepository>;

    commandHandler = new CreateUserCommandHandler(getUserService, repository);
  });

  it('should throw UserAlreadyExistsException when the user already exists', async () => {
    // Arrange
    const existingUser = UserObjectMother.create();
    getUserService.execute.mockResolvedValue(existingUser);

    // Act
    const command = new CreateUserCommand(
      existingUser.getAccountId().toString(),
      existingUser.getId().toString(),
      existingUser.getNickname().toString(),
    );
    expect(async () => await commandHandler.handle(command)).rejects.toThrow(
      UserAlreadyExistsException,
    );
  });

  it('should create a user', async () => {
    // Arrange
    const user = UserObjectMother.create();
    const command = new CreateUserCommand(
      user.getAccountId().toString(),
      user.getId().toString(),
      user.getNickname().toString(),
    );

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.save).toHaveBeenCalledWith({
      id: expect.any(UUID),
      accountId: user.getAccountId(),
      nickname: user.getNickname(),
      preferredLanguage: user.getPreferredLanguage(),
      createdAt: expect.any(DateValueObject),
      updatedAt: null,
      deletedAt: null,
      domainEvents: [],
    });
  });
});
