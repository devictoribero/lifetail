import { GetUserQueryHandler } from './GetUserQueryHandler';
import { GetUserService } from '../../domain/services/GetUserService';
import { GetUserQuery } from './GetUserQuery';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { randomUUID } from 'node:crypto';
import { UserObjectMother } from '../../domain/entities/UserObjectMother.spec';

describe('GetUserQueryHandler', () => {
  let queryHandler: GetUserQueryHandler;
  let getUserService: jest.Mocked<GetUserService>;

  beforeEach(() => {
    getUserService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserService>;

    queryHandler = new GetUserQueryHandler(getUserService);
  });

  it('should throw UserNotFoundException when user does not exist', async () => {
    // Arrange
    const accountId = randomUUID();
    const query = new GetUserQuery(accountId);
    getUserService.execute.mockResolvedValue(null);

    // Act & Assert
    await expect(queryHandler.handle(query)).rejects.toThrow(new UserNotFoundException());
    expect(getUserService.execute).toHaveBeenCalledWith(new UUID(accountId));
  });

  it('should get a user when it exists', async () => {
    // Arrange
    const existingUser = UserObjectMother.create();
    getUserService.execute.mockResolvedValue(existingUser);
    const query = new GetUserQuery(existingUser.getAccountId().toString());

    // Act
    const result = await queryHandler.handle(query);

    // Assert
    expect(getUserService.execute).toHaveBeenCalledWith(existingUser.getAccountId());
    expect(result).toBe(existingUser);
  });
});
