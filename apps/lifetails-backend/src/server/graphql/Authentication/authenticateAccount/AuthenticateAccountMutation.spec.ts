import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthenticateAccountMutation } from './AuthenticateAccountMutation';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/InvalidCredentialsException';
import { JwtTokenGenerator } from 'src/contexts/Lifetails/Authentication/infrastructure/services/JwtTokenGenerator';
import { GetUserQueryHandler } from 'src/contexts/Lifetails/Users/application/getUser/GetUserQueryHandler';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

describe('AuthenticateAccountMutation', () => {
  let mutation: AuthenticateAccountMutation;
  let commandHandler: AuthenticateAccountCommandHandler;
  let jwtService: JwtTokenGenerator;
  let getUserQueryHandler: GetUserQueryHandler;
  const mockToken = 'mock-jwt-token';
  const mockUserId = faker.string.uuid();

  beforeEach(async () => {
    // Create mock use case with Jest
    commandHandler = {
      execute: jest.fn(),
    } as unknown as AuthenticateAccountCommandHandler;

    // Create mock JWT service
    jwtService = {
      generateToken: jest.fn().mockResolvedValue(mockToken),
    } as unknown as JwtTokenGenerator;

    // Create mock GetUserQueryHandler
    getUserQueryHandler = {
      execute: jest.fn().mockResolvedValue({
        getId: () => new UUID(mockUserId),
      }),
    } as unknown as GetUserQueryHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateAccountMutation,
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

    mutation = module.get<AuthenticateAccountMutation>(AuthenticateAccountMutation);
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
    expect(commandHandler.execute).toHaveBeenCalled();
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
    expect(commandHandler.execute).toHaveBeenCalled();
  });

  it('should return accountId, userId and token when authentication is successful', async () => {
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
    });
    expect(commandHandler.execute).toHaveBeenCalled();
    expect(getUserQueryHandler.execute).toHaveBeenCalled();
    expect(jwtService.generateToken).toHaveBeenCalledWith({
      accountId,
      userId: mockUserId,
      email: input.email,
    });
  });
});
