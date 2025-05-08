import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { CreateAccountMutation } from './CreateAccountMutation';
import { CreateAccountUseCase } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountUseCase';
import { CreateAccountInput } from './CreateAccountInput';
import { EmailAlreadyInUseException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/EmailAlreadyInUseException';
import { Account } from 'src/contexts/Lifetails/Authentication/domain/entities/Account';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

describe('CreateAccountMutation', () => {
  let mutation: CreateAccountMutation;
  let useCase: CreateAccountUseCase;

  beforeEach(async () => {
    // Create mock use case with Jest
    useCase = {
      execute: jest.fn(),
    } as unknown as CreateAccountUseCase;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountMutation,
        {
          provide: CreateAccountUseCase,
          useValue: useCase,
        },
      ],
    }).compile();

    mutation = module.get<CreateAccountMutation>(CreateAccountMutation);
    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it('should return account id when creation is successful', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockedId = faker.string.uuid();
    const mockAccount = {
      getId: () => new UUID(mockedId),
    } as unknown as Account;

    jest.spyOn(useCase, 'execute').mockResolvedValue(mockAccount);

    // Act
    const result = await mutation.createAccount(input);

    // Assert
    expect(result).toEqual({ id: mockedId });
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should throw error when email is already in use', async () => {
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
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should throw error when an unexpected error occurs', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const errorMessage = 'Unexpected error';

    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow(errorMessage);
    expect(useCase.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });
});
