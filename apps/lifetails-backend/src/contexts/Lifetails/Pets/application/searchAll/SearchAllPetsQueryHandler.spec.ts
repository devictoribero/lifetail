import { SearchAllPetsQueryHandler } from './SearchAllPetsQueryHandler';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { Pet } from '../../domain/entities/Pet';
import { Species } from '../../domain/entities/PetSpecies';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { faker } from '@faker-js/faker';

describe('SearchAllPetsQueryHandler', () => {
  let repository: PetInMemoryRepository;
  let queryHandler: SearchAllPetsQueryHandler;
  const ownerId = faker.string.uuid();

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new SearchAllPetsQueryHandler(repository);
  });

  it('should return empty array when no pets exist for user', async () => {
    const query = new SearchAllPetsQuery(ownerId);
    const result = await queryHandler.execute(query);
    expect(result).toEqual([]);
  });

  it('should return all pets for a user', async () => {
    const pet1 = new Pet(
      faker.string.uuid(),
      Species.Cat,
      new StringValueObject('Neko'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2022-01-01')),
      new DateValueObject(new Date('2022-01-01')),
      ownerId,
    );

    const pet2 = new Pet(
      faker.string.uuid(),
      Species.Dog,
      new StringValueObject('Inu'),
      Gender.fromPrimitives('Male'),
      new BooleanValueObject(false),
      new DateValueObject(new Date('2022-02-02')),
      new DateValueObject(new Date('2022-02-02')),
      ownerId,
    );

    // Create a pet for a different user
    const otherUserId = faker.string.uuid();
    const pet3 = new Pet(
      faker.string.uuid(),
      Species.Dog,
      new StringValueObject('Hanstah'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2022-03-03')),
      new DateValueObject(new Date('2022-03-03')),
      otherUserId,
    );

    await repository.save(pet1);
    await repository.save(pet2);
    await repository.save(pet3);

    const findSpy = jest.spyOn(repository, 'findByOwner');
    const query = new SearchAllPetsQuery(ownerId);

    // Act
    const result = await queryHandler.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(ownerId);
    expect(result).toHaveLength(2);
    expect(result[0].getId()).toBe(pet1.getId());
    expect(result[1].getId()).toBe(pet2.getId());
  });
});
