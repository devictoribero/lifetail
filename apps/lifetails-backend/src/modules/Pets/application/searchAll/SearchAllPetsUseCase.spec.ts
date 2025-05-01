import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { SearchAllPetsUseCase } from './SearchAllPetsUseCase';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { PetGender } from '../../domain/entities/PetGender';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

describe('SearchAllPetsUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: SearchAllPetsUseCase;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    useCase = new SearchAllPetsUseCase(repository);
  });

  it('should return an empty array when there are no pets', async () => {
    const result = await useCase.execute();

    expect(result).toEqual([]);
  });

  it('should find all non-deleted pets', async () => {
    // Create pets
    const pet1 = Pet.create(
      'pet-1',
      new StringValueObject(faker.animal.cat()),
      PetGender.fromPrimitives('Male'),
      new StringValueObject('123456'),
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
    );

    const secondPetId = randomUUID();
    const secondPetName = faker.animal.cat();
    const pet2 = Pet.create(
      secondPetId,
      new StringValueObject(secondPetName),
      PetGender.fromPrimitives('Female'),
      new StringValueObject('789012'),
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
    );

    // Save pets
    await repository.save(pet1);
    await repository.save(pet2);

    // Delete one pet
    await repository.remove('pet-1');

    // Search all
    const result = await useCase.execute();

    // Should find only the non-deleted pet
    expect(result).toHaveLength(1);
    expect(result[0].getId()).toBe(secondPetId);
    expect(result[0].getName().toString()).toBe(secondPetName);
  });
});
