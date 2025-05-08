import { GetUserUseCase } from './GetUserUseCase';
import { GetUserService } from '../../domain/services/GetUserService';
import { GetUserQuery } from './GetUserQuery';
import { User } from '../../domain/entities/User';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { randomUUID } from 'node:crypto';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let getUserService: jest.Mocked<GetUserService>;

  beforeEach(() => {
    getUserService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserService>;

    useCase = new GetUserUseCase(getUserService);
  });

  it('should get a user when it exists', async () => {
    // Arrange
    const accountId = randomUUID();
    const userId = randomUUID();

    const mockUser = new User(
      new UUID(userId),
      new UUID(accountId),
      new StringValueObject('John Doe'),
      new StringValueObject('john'),
      Gender.fromPrimitives('Male'),
      new DateValueObject(new Date('1990-01-01')),
      new DateValueObject(new Date()),
    );

    getUserService.execute.mockResolvedValue(mockUser);

    const query = new GetUserQuery(accountId);

    // Act
    const result = await useCase.execute(query);

    // Assert
    expect(getUserService.execute).toHaveBeenCalledWith(new UUID(accountId));
    expect(result).toBe(mockUser);
  });

  it('should throw UserNotFoundException when user does not exist', async () => {
    // Arrange
    const accountId = randomUUID();
    getUserService.execute.mockResolvedValue(null);

    const query = new GetUserQuery(accountId);

    // Act & Assert
    await expect(useCase.execute(query)).rejects.toThrow(new UserNotFoundException(accountId));
    expect(getUserService.execute).toHaveBeenCalledWith(new UUID(accountId));
  });
});
