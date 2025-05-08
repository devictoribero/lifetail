import { CreateUserUseCase } from './CreateUserUseCase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { faker } from '@faker-js/faker';
import { CreateUserCommand } from './CreateUserCommand';
import { GetUserService } from '../../domain/services/GetUserService';
describe('CreateUserUseCase', () => {
  let getUserService: jest.Mocked<GetUserService>;
  let repository: UserRepository;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    getUserService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserService>;

    repository = {
      save: jest.fn(),
      getByAccountId: jest.fn(),
    };

    useCase = new CreateUserUseCase(getUserService, repository);
  });

  it('should create a user', async () => {
    // Arrange
    const id = faker.string.uuid();
    const accountId = faker.string.uuid();
    const name = faker.person.fullName();
    const nickname = faker.person.firstName();
    const gender = 'Male';
    const birthDate = faker.date.birthdate();
    const command = new CreateUserCommand(id, accountId, name, nickname, gender, birthDate);

    // Act
    await useCase.execute(command);

    // Assert
    expect(repository.save).toHaveBeenCalledTimes(1);
    const savedUser = (repository.save as jest.Mock).mock.calls[0][0] as User;
    expect(savedUser).toBeInstanceOf(User);
    expect(savedUser.toPrimitives()).toEqual({
      id,
      accountId,
      name,
      nickname,
      gender,
      birthDate: birthDate.toISOString(),
      createdAt: expect.any(String),
    });
  });
});
