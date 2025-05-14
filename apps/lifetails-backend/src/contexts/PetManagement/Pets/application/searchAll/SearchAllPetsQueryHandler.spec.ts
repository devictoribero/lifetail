import { SearchAllPetsQueryHandler } from './SearchAllPetsQueryHandler';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Pet } from '../../domain/entities/Pet';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';
import { Gender } from 'src/contexts/Shared/domain/Gender';

describe('SearchAllPetsQueryHandler', () => {
  let queryHandler: SearchAllPetsQueryHandler;
  let repository: jest.Mocked<PetRepository>;
  let ownerId: UUID;

  beforeEach(() => {
    repository = {
      findByOwner: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    queryHandler = new SearchAllPetsQueryHandler(repository);
    ownerId = UUID.create();
  });

  it('should return an empty array when no pets found', async () => {
    // Arrange
    repository.findByOwner.mockResolvedValue([]);

    // Act
    const query = new SearchAllPetsQuery(ownerId.toString());
    const result = await queryHandler.handle(query);

    // Assert
    expect(repository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toEqual([]);
  });

  it('should return all pets for an owner', async () => {
    // Arrange
    const petId1 = UUID.create();
    const petId2 = UUID.create();

    // Create two pets
    const pet1 = Pet.create(
      petId1,
      Species.fromPrimitives('Dog'),
      new StringValueObject('Max'),
      Gender.fromPrimitives('Male'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2020-01-01')),
      ownerId,
    );

    const pet2 = Pet.create(
      petId2,
      Species.fromPrimitives('Cat'),
      new StringValueObject('Lucy'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(false),
      new DateValueObject(new Date('2021-05-15')),
      ownerId,
    );

    const pets = [pet1, pet2];
    repository.findByOwner.mockResolvedValue(pets);

    // Act
    const query = new SearchAllPetsQuery(ownerId.toString());
    const result = await queryHandler.handle(query);

    // Assert
    expect(repository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toHaveLength(2);
    expect(result[0].getId()).toEqual(petId1);
    expect(result[1].getId()).toEqual(petId2);
  });
});
