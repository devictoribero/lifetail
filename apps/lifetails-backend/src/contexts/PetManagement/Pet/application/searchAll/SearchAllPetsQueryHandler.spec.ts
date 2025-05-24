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
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';

describe('SearchAllPetsQueryHandler', () => {
  let queryHandler: SearchAllPetsQueryHandler;
  let repository: jest.Mocked<PetRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    queryHandler = new SearchAllPetsQueryHandler(repository);
  });

  it('should return an empty array when no pets found', async () => {
    // Arrange
    repository.findByOwner.mockResolvedValue([]);
    const pet = PetObjectMother.create();
    const ownerId = pet.getOwnerId();

    // Act
    const query = new SearchAllPetsQuery(ownerId.toString());
    const result = await queryHandler.handle(query);

    // Assert
    expect(repository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toEqual([]);
  });

  it.only('should return all pets for an owner', async () => {
    // Arrange
    const pet = PetObjectMother.create();
    const ownerId = pet.getOwnerId();
    const pets = [pet];
    repository.findByOwner.mockResolvedValue(pets);

    // Act
    const query = new SearchAllPetsQuery(ownerId.toString());
    const result = await queryHandler.handle(query);

    // Assert
    expect(repository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toEqual([pet]);
  });
});
