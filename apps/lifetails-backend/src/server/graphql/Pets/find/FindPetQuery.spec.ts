import { Test, TestingModule } from '@nestjs/testing';
import { FindPetQuery } from './FindPetQuery';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
import { FindPetInput } from './FindPetInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Pet } from 'src/contexts/Lifetails/Pets/domain/entities/Pet';
import { Species } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';

describe('FindPetQuery', () => {
  let resolver: FindPetQuery;
  let queryHandler: FindPetQueryHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPetQuery,
        {
          provide: FindPetQueryHandler,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<FindPetQuery>(FindPetQuery);
    queryHandler = module.get<FindPetQueryHandler>(FindPetQueryHandler);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should propagate errors when pet is not found', async () => {
    // Arrange
    const id = randomUUID();
    const input: FindPetInput = { id };
    const error = new Error(`Pet with id ${id} not found`);
    jest.spyOn(queryHandler, 'execute').mockRejectedValue(error);

    // Act & Assert
    await expect(resolver.findPet(input)).rejects.toThrow(
      expect.objectContaining({ message: `Pet with id ${id} not found` }),
    );
  });

  it('should handle errors with no message', async () => {
    // Arrange
    const id = randomUUID();
    const input: FindPetInput = { id };

    jest.spyOn(queryHandler, 'execute').mockRejectedValue({});

    // Act & Assert
    await expect(resolver.findPet(input)).rejects.toThrow('Error finding pet');
  });

  it('should return a pet when found', async () => {
    // Arrange
    const id = faker.string.uuid();
    const name = faker.animal.dog();
    const sterilized = faker.datatype.boolean();
    const birthdate = faker.date.past();
    const createdAt = faker.date.past();
    const userId = faker.string.uuid();
    const pet = new Pet(
      id,
      Species.Cat,
      new StringValueObject(name),
      Gender.Male,
      new BooleanValueObject(sterilized),
      new DateValueObject(birthdate),
      new DateValueObject(createdAt),
      userId,
    );
    jest.spyOn(queryHandler, 'execute').mockResolvedValue(pet);

    // Act
    const input: FindPetInput = { id };
    const result = await resolver.findPet(input);

    // Assert
    expect(queryHandler.execute).toHaveBeenCalledWith(expect.objectContaining({ id }));

    expect(result).toBeDefined();
    expect(result.id).toBe(pet.getId().toString());
    expect(result.species).toBe(pet.getSpecies().toString());
    expect(result.name).toBe(pet.getName().toString());
    expect(result.gender).toBe(pet.getGender().toString());
    expect(result.sterilized).toBe(pet.isSterilized().getValue());
    expect(result.anniversaryDate).toBe(pet.getAnniversaryDate().toISOString());
    expect(result.createdAt).toBe(pet.getCreatedAt().toISOString());
    expect(result.userId).toBe(pet.getUserId());
    expect(result.chipId).toBeNull();
  });
});
