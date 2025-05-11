import { GetUserQueryHandler } from './GetUserQueryHandler';
import { GetUserService } from '../../domain/services/GetUserService';
import { GetUserQuery } from './GetUserQuery';
import { User } from '../../domain/entities/User';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { randomUUID } from 'node:crypto';

describe('GetUserQueryHandler', () => {
  let queryHandler: GetUserQueryHandler;
  let getUserService: jest.Mocked<GetUserService>;

  beforeEach(() => {
    getUserService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserService>;

    queryHandler = new GetUserQueryHandler(getUserService);
  });

  it('should get a user when it exists', async () => {
    // Arrange
    const accountId = randomUUID();
    const userId = randomUUID();

    const mockUser = new User(
      new UUID(userId),
      new UUID(accountId),
      new StringValueObject('John Doe'),
      new DateValueObject(new Date()),
    );

    getUserService.execute.mockResolvedValue(mockUser);

    const query = new GetUserQuery(accountId);

    // Act
    const result = await queryHandler.execute(query);

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
    await expect(queryHandler.execute(query)).rejects.toThrow(new UserNotFoundException(accountId));
    expect(getUserService.execute).toHaveBeenCalledWith(new UUID(accountId));
  });
});
