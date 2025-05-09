import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { FindPetQueryHandler } from './FindPetQueryHandler';
import { FindPetQuery } from './FindPetQuery';
import { Pet } from '../../domain/entities/Pet';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';

describe('FindPetQueryHandler', () => {
  let repository: PetInMemoryRepository;
  let queryHandler: FindPetQueryHandler;
  let ownerId: string;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new FindPetQueryHandler(repository);
    ownerId = faker.string.uuid();
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Arrange
    const nonExistentId = faker.string.uuid();
    const query = new FindPetQuery(nonExistentId);

    // Act & Assert
    await expect(queryHandler.execute(query)).rejects.toThrow(
      new PetNotFoundException(nonExistentId),
    );
  });

  it('should find a pet', async () => {
    // Arrange
    const id = faker.string.uuid();
    const name = faker.animal.cat();
    const gender = 'Female';
    const chipId = faker.string.numeric(9);
    const sterilized = true;
    const anniversaryDate = faker.date.past();
    const createdAt = faker.date.past();

    // Create and save a pet
    const pet = new Pet(
      id,
      Species.Cat,
      new StringValueObject(name),
      Gender.fromPrimitives(gender),
      new BooleanValueObject(sterilized),
      new DateValueObject(anniversaryDate),
      new DateValueObject(createdAt),
      ownerId,
      new StringValueObject(chipId),
    );

    await repository.save(pet);

    const findSpy = jest.spyOn(repository, 'find');
    const query = new FindPetQuery(id);

    // Act
    const foundPet = await queryHandler.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(foundPet).toBeInstanceOf(Pet);
    expect(foundPet.getId()).toBe(id);
    expect(foundPet.getName().toString()).toBe(name);
    expect(foundPet.getGender().toString()).toBe(gender);
    expect(foundPet.getChipId().toString()).toBe(chipId);
    expect(foundPet.isSterilized().getValue()).toBe(sterilized);
    expect(foundPet.getAnniversaryDate().toDate().getTime()).toBe(anniversaryDate.getTime());
  });
});
