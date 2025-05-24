import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthenticateAccountGQLMutation } from './AuthenticateAccountGQLMutation';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from 'src/contexts/Identity/Authentication/domain/exceptions/InvalidCredentialsException';
import { Account } from 'src/contexts/Identity/Account/domain/entities/Account';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { JwtTokenGenerator } from 'src/contexts/Identity/Authentication/infrastructure/services/JwtTokenGenerator';
import { GetUserQueryHandler } from 'src/contexts/Identity/User/application/get/GetUserQueryHandler';
import { User } from 'src/contexts/Identity/User/domain/entities/User';

describe('AuthenticateAccountGQLMutation', () => {
  let mockedId: string;
  let mutation: AuthenticateAccountGQLMutation;
  let commandHandler: AuthenticateAccountCommandHandler;
  let tokenGenerator: JwtTokenGenerator;
  let getUserQueryHandler: GetUserQueryHandler;

  beforeEach(async () => {
    mockedId = faker.string.uuid();
    const mockAccountId = mockedId; // string
    const mockAccount = {
      getId: () => mockAccountId,
    } as unknown as Account;

    const mockUser = {
      getId: () => faker.string.uuid(),
    } as unknown as User;

    // Create mock command handler with Jest
    const mockCommandHandler = {
      handle: jest.fn().mockResolvedValue(mockAccount.getId()),
    } as unknown as AuthenticateAccountCommandHandler;

    // Create mock token generator
    const mockTokenGenerator = {
      generateToken: jest.fn().mockResolvedValue('mock-token'),
      generateRefreshToken: jest.fn().mockResolvedValue('mock-refresh-token'),
    } as unknown as JwtTokenGenerator;

    // Create mock user query handler
    const mockGetUserQueryHandler = {
      handle: jest.fn().mockResolvedValue(mockUser),
    } as unknown as GetUserQueryHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateAccountGQLMutation,
        {
          provide: AuthenticateAccountCommandHandler,
          useValue: mockCommandHandler,
        },
        {
          provide: JwtTokenGenerator,
          useValue: mockTokenGenerator,
        },
        {
          provide: GetUserQueryHandler,
          useValue: mockGetUserQueryHandler,
        },
      ],
    }).compile();

    mutation = module.get<AuthenticateAccountGQLMutation>(AuthenticateAccountGQLMutation);
    commandHandler = module.get<AuthenticateAccountCommandHandler>(
      AuthenticateAccountCommandHandler,
    );
    tokenGenerator = module.get<JwtTokenGenerator>(JwtTokenGenerator);
    getUserQueryHandler = module.get<GetUserQueryHandler>(GetUserQueryHandler);
  });

  it('should throw error when credentials are invalid', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    commandHandler.handle = jest.fn().mockRejectedValue(new InvalidCredentialsException());

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow(
      new InvalidCredentialsException().message,
    );
    expect(commandHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        password: input.password,
      }),
    );
  });

  it('should throw error when an unexpected error occurs', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const errorMessage = 'Unexpected error';

    commandHandler.handle = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow(errorMessage);
    expect(commandHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        password: input.password,
      }),
    );
  });

  it('should authenticate an account', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Act
    const result = await mutation.authenticateAccount(input);

    // Assert
    expect(commandHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        password: input.password,
      }),
    );
    expect(tokenGenerator.generateToken).toHaveBeenCalledWith(
      expect.objectContaining({
        accountId: mockedId,
        email: input.email,
      }),
    );
    expect(tokenGenerator.generateRefreshToken).toHaveBeenCalledWith(
      expect.objectContaining({
        accountId: mockedId,
        email: input.email,
      }),
    );
    expect(result).toEqual({
      accountId: mockedId,
      userId: expect.any(String),
      token: 'mock-token',
      refreshToken: 'mock-refresh-token',
    });
  });
});
