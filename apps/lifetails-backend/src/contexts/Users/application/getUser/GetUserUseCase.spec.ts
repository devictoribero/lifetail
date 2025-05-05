import { GetUserUseCase } from './GetUserUseCase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { faker } from '@faker-js/faker';
import { GetUserCommand } from './GetUserCommand';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';

describe('GetUserUseCase', () => {
  let repository: UserRepository;
  let useCase: GetUserUseCase;
  let mockUser: User;
  const accountId = faker.string.uuid();

  beforeEach(() => {
    const id = faker.string.uuid();
    const name = faker.person.fullName();
    const nickname = faker.person.firstName();
    const gender = Gender.fromPrimitives('Male');
    const birthDate = new DateValueObject(faker.date.birthdate());

    mockUser = User.create(
      new UUID(id),
      new UUID(accountId),
      new StringValueObject(name),
      new StringValueObject(nickname),
      gender,
      birthDate,
    );

    repository = {
      save: jest.fn(),
      getByAccountId: jest.fn().mockResolvedValue(mockUser),
    };

    useCase = new GetUserUseCase(repository);
  });

  it('should get a user by account ID', async () => {
    // Arrange
    const command = new GetUserCommand(accountId);

    // Act
    const result = await useCase.execute(command);

    // Assert
    expect(repository.getByAccountId).toHaveBeenCalledTimes(1);
    expect(repository.getByAccountId).toHaveBeenCalledWith(expect.any(UUID));
    expect(result).toEqual(mockUser);
  });

  it('should throw UserNotFoundException when user is not found', async () => {
    // Arrange
    const notFoundAccountId = faker.string.uuid();
    (repository.getByAccountId as jest.Mock).mockResolvedValue(null);
    const command = new GetUserCommand(notFoundAccountId);

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow(UserNotFoundException);
  });
});
