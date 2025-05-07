import { GetUserUseCase } from './GetUserUseCase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { faker } from '@faker-js/faker';
import { GetUserQuery } from './GetUserQuery';
import { UUID } from 'src/Lifetails/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/Lifetails/contexts/Shared/domain/StringValueObject';
import { Gender } from 'src/Lifetails/contexts/Shared/domain/Gender';
import { DateValueObject } from 'src/Lifetails/contexts/Shared/domain/DateValueObject';
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
    const command = new GetUserQuery(accountId);

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
    const command = new GetUserQuery(notFoundAccountId);

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow(UserNotFoundException);
  });
});
