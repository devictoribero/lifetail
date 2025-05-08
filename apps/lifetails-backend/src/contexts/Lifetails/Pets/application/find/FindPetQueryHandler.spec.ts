import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { FindPetQueryHandler } from './FindPetQueryHandler';
import { FindPetQuery } from './FindPetQuery';
import { Pet } from '../../domain/entities/Pet';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { randomUUID } from 'node:crypto';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';

describe('FindPetQueryHandler', () => {
  let repository: PetInMemoryRepository;
  let queryHandler: FindPetQueryHandler;
  let userId: string;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new FindPetQueryHandler(repository);
    userId = randomUUID();
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const query = new FindPetQuery(nonExistentId);

    // Act & Assert
    await expect(queryHandler.execute(query)).rejects.toThrow(
      new PetNotFoundException(nonExistentId),
    );
  });

  it('should find a pet', async () => {
    // Arrange
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = 'Female';
    const chipId = faker.string.numeric(9);
    // const sterilized = faker.datatype.boolean();
    const sterilized = true;
    const anniversaryDate = faker.date.past();

    // Create and save a pet
    const pet = Pet.create(
      id,
      Species.Cat,
      new StringValueObject(name),
      Gender.fromPrimitives(gender),
      new StringValueObject(chipId),
      new BooleanValueObject(sterilized),
      new DateValueObject(anniversaryDate),
      userId,
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
