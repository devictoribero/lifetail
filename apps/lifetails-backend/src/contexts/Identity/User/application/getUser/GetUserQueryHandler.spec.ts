import { GetUserQueryHandler } from './GetUserQueryHandler';
import { GetUserService } from '../../domain/services/GetUserService';
import { GetUserQuery } from './GetUserQuery';
import { User } from '../../domain/entities/User';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { randomUUID } from 'node:crypto';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';

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

    const mockUser = new User({
      id: new UUID(userId),
      accountId: new UUID(accountId),
      nickname: new StringValueObject('John Doe'),
      createdAt: new DateValueObject(new Date()),
      preferredLanguage: LanguageCode.English,
    });

    getUserService.execute.mockResolvedValue(mockUser);

    const query = new GetUserQuery(accountId);

    // Act
    const result = await queryHandler.handle(query);

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
    await expect(queryHandler.handle(query)).rejects.toThrow(new UserNotFoundException());
    expect(getUserService.execute).toHaveBeenCalledWith(new UUID(accountId));
  });
});
