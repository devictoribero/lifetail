import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountMutation } from './CreateAccountMutation';
import { CreateAccountUseCase } from '../../application/createAccount/CreateAccountUseCase';
import { CreateAccountInput } from './CreateAccountInput';
import { EmailAlreadyInUseException } from '../../domain/exceptions/EmailAlreadyInUseException';
import { faker } from '@faker-js/faker';

describe('CreateAccountMutation', () => {
  let mutation: CreateAccountMutation;
  let useCase: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountMutation,
        {
          provide: CreateAccountUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    mutation = module.get<CreateAccountMutation>(CreateAccountMutation);
    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });

  it('should execute the use case with correct parameters', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Act
    await mutation.createAccount(input);

    // Assert
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should return the email after successful account creation', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    // Act
    const result = await mutation.createAccount(input);

    // Assert
    expect(result).toEqual({ email: input.email });
  });

  it('should throw custom error when email is already in use', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    jest.spyOn(useCase, 'execute').mockRejectedValue(new EmailAlreadyInUseException());

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow(
      'This email is already registered.',
    );
  });

  it('should propagate other errors with their message', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const errorMessage = 'Unexpected error';
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow(errorMessage);
  });
});
