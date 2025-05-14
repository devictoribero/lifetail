import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { GetPetQueryHandler } from './GetPetQueryHandler';
import { GetPetQuery } from './GetPetQuery';
import { Pet } from '../../domain/entities/Pet';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('GetPetQueryHandler', () => {
  let repository: PetInMemoryRepository;
  let queryHandler: GetPetQueryHandler;
  let ownerId: string;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new GetPetQueryHandler(repository);
    ownerId = faker.string.uuid();
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Arrange
    const nonExistentId = faker.string.uuid();
    const query = new GetPetQuery(nonExistentId);

    // Act & Assert
    await expect(queryHandler.handle(query)).rejects.toThrow(
      new PetNotFoundException(nonExistentId),
    );
  });

  it('should get a pet', async () => {
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
      new UUID(id),
      Species.Cat,
      new StringValueObject(name),
      Gender.fromPrimitives(gender),
      new BooleanValueObject(sterilized),
      new DateValueObject(anniversaryDate),
      new DateValueObject(createdAt),
      new UUID(ownerId),
      new StringValueObject(chipId),
    );

    await repository.save(pet);

    const findSpy = jest.spyOn(repository, 'find');
    const query = new GetPetQuery(id);

    // Act
    const foundPet = await queryHandler.handle(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(new UUID(id));
    expect(foundPet).toBeInstanceOf(Pet);
    expect(foundPet.getId().toString()).toBe(id);
    expect(foundPet.getName().toString()).toBe(name);
    expect(foundPet.getGender().toString()).toBe(gender);
    expect(foundPet.getChipId().toString()).toBe(chipId);
    expect(foundPet.isSterilized().getValue()).toBe(sterilized);
    expect(foundPet.getAnniversaryDate().toISOString()).toBe(anniversaryDate.toISOString());
  });
});
