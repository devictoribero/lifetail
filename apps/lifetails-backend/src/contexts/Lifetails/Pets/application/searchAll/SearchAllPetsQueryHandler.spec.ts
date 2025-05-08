import { SearchAllPetsQueryHandler } from './SearchAllPetsQueryHandler';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { randomUUID } from 'node:crypto';
import { Pet } from '../../domain/entities/Pet';
import { Species } from '../../domain/entities/PetSpecies';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';

describe('SearchAllPetsQueryHandler', () => {
  let repository: PetInMemoryRepository;
  let queryHandler: SearchAllPetsQueryHandler;
  const userId = randomUUID();

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new SearchAllPetsQueryHandler(repository);
  });

  it('should return empty array when no pets exist for user', async () => {
    const query = new SearchAllPetsQuery(userId);
    const result = await queryHandler.execute(query);
    expect(result).toEqual([]);
  });

  it('should return all pets for a user', async () => {
    // Create and save 2 pets for this user
    const pet1 = Pet.create(
      randomUUID(),
      Species.Cat,
      new StringValueObject('Neko'),
      Gender.fromPrimitives('Female'),
      new StringValueObject('123456789'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2022-01-01')),
      userId,
    );

    const pet2 = Pet.create(
      randomUUID(),
      Species.Dog,
      new StringValueObject('Inu'),
      Gender.fromPrimitives('Male'),
      new StringValueObject('987654321'),
      new BooleanValueObject(false),
      new DateValueObject(new Date('2022-02-02')),
      userId,
    );

    // Create a pet for a different user
    const otherUserId = randomUUID();
    const pet3 = Pet.create(
      randomUUID(),
      Species.Dog,
      new StringValueObject('Hanstah'),
      Gender.fromPrimitives('Female'),
      new StringValueObject('555555555'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2022-03-03')),
      otherUserId,
    );

    await repository.save(pet1);
    await repository.save(pet2);
    await repository.save(pet3);

    const findSpy = jest.spyOn(repository, 'findByUser');
    const query = new SearchAllPetsQuery(userId);

    // Act
    const result = await queryHandler.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(userId);
    expect(result).toHaveLength(2);
    expect(result[0].getId()).toBe(pet1.getId());
    expect(result[1].getId()).toBe(pet2.getId());
  });
});
