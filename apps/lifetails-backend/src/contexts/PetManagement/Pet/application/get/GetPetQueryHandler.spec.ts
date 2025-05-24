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
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';

describe('GetPetQueryHandler', () => {
  let repository: jest.Mocked<PetRepository>;
  let queryHandler: GetPetQueryHandler;
  let ownerId: string;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    queryHandler = new GetPetQueryHandler(repository);
    ownerId = faker.string.uuid();
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Arrange
    repository.find.mockResolvedValue(null);
    const query = new GetPetQuery(UUID.generate().toString());

    // Act & Assert
    await expect(queryHandler.handle(query)).rejects.toThrow(new PetNotFoundException());
  });

  it('should get a pet', async () => {
    // Arrange
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const query = new GetPetQuery(pet.getId().toString());

    // Act
    const foundPet = await queryHandler.handle(query);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(pet.getId().toString()));
    expect(foundPet).toBeInstanceOf(Pet);
    expect(foundPet.getId().equals(pet.getId())).toBeTruthy();
    expect(foundPet.getName().equals(pet.getName())).toBeTruthy();
    expect(foundPet.getGender().equals(pet.getGender())).toBeTruthy();
    expect(foundPet.isSterilized().equals(pet.isSterilized())).toBeTruthy();
    expect(foundPet.getBirthDate().equals(pet.getBirthDate())).toBeTruthy();
    expect(foundPet.getArrivalDate().equals(pet.getArrivalDate())).toBeTruthy();
    expect(foundPet.getOwnerId().equals(pet.getOwnerId())).toBeTruthy();
    expect(foundPet.getColor().equals(pet.getColor())).toBeTruthy();
    expect(foundPet.getSpecies().equals(pet.getSpecies())).toBeTruthy();
    expect(foundPet.getCreatedAt().equals(pet.getCreatedAt())).toBeTruthy();
    expect(foundPet.getUpdatedAt()).toBeNull();
    expect(foundPet.getDeletedAt()).toBeNull();
  });
});
