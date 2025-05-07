import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthenticateAccountMutation } from './AuthenticateAccountMutation';
import { AuthenticateAccountUseCase } from '../../application/authenticateAccount/AuthenticateAccountUseCase';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from '../../domain/exceptions/InvalidCredentialsException';

describe('AuthenticateAccountMutation', () => {
  let mutation: AuthenticateAccountMutation;
  let useCase: AuthenticateAccountUseCase;

  beforeEach(async () => {
    // Create mock use case with Jest
    useCase = {
      execute: jest.fn(),
    } as unknown as AuthenticateAccountUseCase;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateAccountMutation,
        {
          provide: AuthenticateAccountUseCase,
          useValue: useCase,
        },
      ],
    }).compile();

    mutation = module.get<AuthenticateAccountMutation>(AuthenticateAccountMutation);
    useCase = module.get<AuthenticateAccountUseCase>(AuthenticateAccountUseCase);
  });

  it('should return accountId when authentication is successful', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const accountId = faker.string.uuid();

    jest.spyOn(useCase, 'execute').mockResolvedValue(accountId);

    // Act
    const result = await mutation.authenticateAccount(input);

    // Assert
    expect(result).toEqual({ accountId });
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should throw error when credentials are invalid', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(useCase, 'execute').mockRejectedValue(new InvalidCredentialsException());

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow('Invalid email or password');
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should throw error when an unexpected error occurs', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const errorMessage = 'Unexpected error';

    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow(errorMessage);
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });
});
