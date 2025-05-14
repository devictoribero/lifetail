import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthenticateAccountGQLMutation } from './AuthenticateAccountGQLMutation';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from 'src/contexts/Identity/Authentication/domain/exceptions/InvalidCredentialsException';
import { JwtTokenGenerator } from 'src/contexts/Identity/Authentication/infrastructure/services/JwtTokenGenerator';
import { GetUserQueryHandler } from 'src/contexts/Identity/Users/application/getUser/GetUserQueryHandler';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('AuthenticateAccountGQLMutation', () => {
  let mutation: AuthenticateAccountGQLMutation;
  let commandHandler: AuthenticateAccountCommandHandler;
  let jwtService: JwtTokenGenerator;
  let getUserQueryHandler: GetUserQueryHandler;
  const mockToken = 'mock-jwt-token';
  const mockRefreshToken = 'mock-refresh-token';
  const mockUserId = faker.string.uuid();

  beforeEach(async () => {
    // Create mock use case with Jest
    commandHandler = {
      execute: jest.fn(),
    } as unknown as AuthenticateAccountCommandHandler;

    // Create mock JWT service
    jwtService = {
      generateToken: jest.fn().mockResolvedValue(mockToken),
      generateRefreshToken: jest.fn().mockResolvedValue(mockRefreshToken),
    } as unknown as JwtTokenGenerator;

    // Create mock GetUserQueryHandler
    getUserQueryHandler = {
      execute: jest.fn().mockResolvedValue({
        getId: () => new UUID(mockUserId),
      }),
    } as unknown as GetUserQueryHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateAccountGQLMutation,
        {
          provide: AuthenticateAccountCommandHandler,
          useValue: commandHandler,
        },
        {
          provide: JwtTokenGenerator,
          useValue: jwtService,
        },
        {
          provide: GetUserQueryHandler,
          useValue: getUserQueryHandler,
        },
      ],
    }).compile();

    mutation = module.get<AuthenticateAccountGQLMutation>(AuthenticateAccountGQLMutation);
    commandHandler = module.get<AuthenticateAccountCommandHandler>(
      AuthenticateAccountCommandHandler,
    );
    jwtService = module.get<JwtTokenGenerator>(JwtTokenGenerator);
    getUserQueryHandler = module.get<GetUserQueryHandler>(GetUserQueryHandler);
  });

  it('should throw error when account is not found', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(commandHandler, 'execute').mockRejectedValue(new InvalidCredentialsException());

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow('Invalid email or password');
    expect(commandHandler.handle).toHaveBeenCalled();
  });

  it('should throw error when credentials are invalid', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(commandHandler, 'execute').mockRejectedValue(new InvalidCredentialsException());

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow('Invalid email or password');
    expect(commandHandler.handle).toHaveBeenCalled();
  });

  it('should return accountId, userId, token and refreshToken when authentication is successful', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const accountId = faker.string.uuid();

    jest.spyOn(commandHandler, 'execute').mockResolvedValue(accountId);

    // Act
    const result = await mutation.authenticateAccount(input);

    // Assert
    expect(result).toEqual({
      accountId,
      userId: mockUserId,
      token: mockToken,
      refreshToken: mockRefreshToken,
    });
    expect(commandHandler.handle).toHaveBeenCalled();
    expect(getUserQueryHandler.execute).toHaveBeenCalled();

    const expectedPayload = {
      accountId,
      userId: mockUserId,
      email: input.email,
    };

    expect(jwtService.generateToken).toHaveBeenCalledWith(expectedPayload);
    expect(jwtService.generateRefreshToken).toHaveBeenCalledWith(expectedPayload);
  });
});
