import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { FindPetUseCase } from './FindPetUseCase';
import { FindPetQuery } from './FindPetQuery';
import { Pet } from '../../domain/entities/Pet';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { randomUUID } from 'node:crypto';
import { PetGender } from '../../domain/entities/PetGender';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/modules/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('FindPetUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: FindPetUseCase;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    useCase = new FindPetUseCase(repository);
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const query = new FindPetQuery(nonExistentId);

    // Act & Assert
    await expect(useCase.execute(query)).rejects.toThrow(new PetNotFoundException(nonExistentId));
  });

  it.only('should find a pet by id', async () => {
    // Arrange
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = 'Female';
    const chipId = faker.string.numeric(9);
    // const sterilized = faker.datatype.boolean();
    const sterilized = true;
    const birthdate = faker.date.past();

    // Create and save a pet
    const pet = Pet.create(
      id,
      new StringValueObject(name),
      PetGender.fromPrimitives(gender),
      new StringValueObject(chipId),
      new BooleanValueObject(sterilized),
      new DateValueObject(birthdate),
    );

    await repository.save(pet);

    const findSpy = jest.spyOn(repository, 'find');
    const query = new FindPetQuery(id);

    // Act
    const foundPet = await useCase.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(foundPet).toBeInstanceOf(Pet);
    expect(foundPet.getId()).toBe(id);
    expect(foundPet.getName().toString()).toBe(name);
    expect(foundPet.getGender().toString()).toBe(gender);
    expect(foundPet.getChipId().toString()).toBe(chipId);
    expect(foundPet.isSterilized().getValue()).toBe(sterilized);
    expect(foundPet.getBirthdate().toDate().getTime()).toBe(birthdate.getTime());
  });
});
