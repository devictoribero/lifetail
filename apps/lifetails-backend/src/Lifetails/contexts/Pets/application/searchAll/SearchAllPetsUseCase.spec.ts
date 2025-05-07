import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { SearchAllPetsUseCase } from './SearchAllPetsUseCase';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { Pet } from '../../domain/entities/Pet';
import { randomUUID } from 'node:crypto';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/Lifetails/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/Lifetails/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/Lifetails/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';

describe('SearchAllPetsUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: SearchAllPetsUseCase;
  let userId: string;
  let anotherUserId: string;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    useCase = new SearchAllPetsUseCase(repository);
    userId = randomUUID();
    anotherUserId = randomUUID();
  });

  it('should return empty array when user has no pets', async () => {
    // Arrange
    const query = new SearchAllPetsQuery(userId);
    const findByUserSpy = jest.spyOn(repository, 'findByUser');

    // Act
    const pets = await useCase.execute(query);

    // Assert
    expect(findByUserSpy).toHaveBeenCalledTimes(1);
    expect(findByUserSpy).toHaveBeenCalledWith(userId);
    expect(pets).toEqual([]);
  });

  it("should return user's pets only when userId is provided", async () => {
    // Arrange
    // Create 2 pets for the target user
    const userPet1 = createPet(userId);
    const userPet2 = createPet(userId);

    // Create 1 pet for another user
    const anotherUserPet = createPet(anotherUserId);

    // Save all the pets
    await repository.save(userPet1);
    await repository.save(userPet2);
    await repository.save(anotherUserPet);

    const findByUserSpy = jest.spyOn(repository, 'findByUser');
    const query = new SearchAllPetsQuery(userId);

    // Act
    const pets = await useCase.execute(query);

    // Assert
    expect(findByUserSpy).toHaveBeenCalledTimes(1);
    expect(findByUserSpy).toHaveBeenCalledWith(userId);
    expect(pets).toHaveLength(2);
    expect(pets[0].getUserId()).toBe(userId);
    expect(pets[1].getUserId()).toBe(userId);
  });

  // Helper function to create a pet for a specific user
  function createPet(ownerId?: string): Pet {
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = faker.helpers.arrayElement(['Male', 'Female']);
    const chipId = faker.string.numeric(9);
    const sterilized = faker.datatype.boolean();
    const anniversaryDate = faker.date.past();

    return Pet.create(
      id,
      Species.Cat,
      new StringValueObject(name),
      Gender.fromPrimitives(gender),
      new StringValueObject(chipId),
      new BooleanValueObject(sterilized),
      new DateValueObject(anniversaryDate),
      ownerId,
    );
  }
});
