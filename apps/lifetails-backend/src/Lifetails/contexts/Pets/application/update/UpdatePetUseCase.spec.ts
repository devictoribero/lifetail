import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { UpdatePetUseCase } from './UpdatePetUseCase';
import { UpdatePetCommand } from './UpdatePetCommand';
import { StringValueObject } from 'src/Lifetails/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/Lifetails/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/Lifetails/contexts/Shared/domain/DateValueObject';
import { Gender } from '../../../Shared/domain/Gender';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';
import { Species } from '../../domain/entities/PetSpecies';

describe('UpdatePetUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: UpdatePetUseCase;
  let petId: string;
  let userId: string;
  let originalPet: Pet;

  beforeEach(async () => {
    repository = new PetInMemoryRepository();
    useCase = new UpdatePetUseCase(repository);

    // Create a pet for testing
    petId = randomUUID();
    originalPet = Pet.create(
      petId,
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.fromPrimitives('Male'),
      new StringValueObject(faker.string.numeric(9)),
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
      userId,
    );

    await repository.save(originalPet);
  });

  it('should throw a PetNotFoundException error when pet does not exist', async () => {
    const command = new UpdatePetCommand('non-existing-id');

    await expect(useCase.execute(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should update all pet fields when all are provided', async () => {
    const newName = faker.animal.cat();
    const newGender = 'Female';
    const newChipId = faker.string.numeric(9);
    const newSterilized = faker.datatype.boolean();
    const newBirthdate = faker.date.past();

    const command = new UpdatePetCommand(
      petId,
      newName,
      newGender,
      newChipId,
      newSterilized,
      newBirthdate,
    );

    await useCase.execute(command);

    const updatedPet = await repository.find(petId);
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(newName);
    expect(updatedPet?.getGender().toString()).toBe(newGender);
    expect(updatedPet?.getChipId().toString()).toBe(newChipId);
    expect(updatedPet?.isSterilized().getValue()).toBe(newSterilized);
    expect(updatedPet?.getAnniversaryDate().toISOString()).toBe(
      new DateValueObject(newBirthdate).toISOString(),
    );
  });

  it('should update only name when only name is provided', async () => {
    const newName = faker.animal.cat();
    const command = new UpdatePetCommand(petId, newName);

    await useCase.execute(command);

    const updatedPet = await repository.find(petId);
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(newName);
    expect(updatedPet?.getGender().toString()).toBe(originalPet.getGender().toString()); // Unchanged
    expect(updatedPet?.getChipId().toString()).toBe(originalPet.getChipId().toString()); // Unchanged
    expect(updatedPet?.isSterilized().getValue()).toBe(originalPet.isSterilized().getValue()); // Unchanged
    expect(updatedPet?.getAnniversaryDate().toISOString()).toBe(
      originalPet.getAnniversaryDate().toISOString(),
    ); // Unchanged
  });

  it('should update only sterilized status when only that is provided', async () => {
    const newSterilized = !originalPet.isSterilized().getValue();
    const command = new UpdatePetCommand(petId, undefined, undefined, undefined, newSterilized);

    await useCase.execute(command);

    const updatedPet = await repository.find(petId);
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(originalPet.getName().toString()); // Unchanged
    expect(updatedPet?.getGender().toString()).toBe(originalPet.getGender().toString()); // Unchanged
    expect(updatedPet?.getChipId().toString()).toBe(originalPet.getChipId().toString()); // Unchanged
    expect(updatedPet?.isSterilized().getValue()).not.toBe(originalPet.isSterilized().getValue()); // Changed
    expect(updatedPet?.getAnniversaryDate().toISOString()).toBe(
      originalPet.getAnniversaryDate().toISOString(),
    ); // Unchanged
  });

  it('should update multiple fields when multiple are provided', async () => {
    const newGender = 'Female';
    const newBirthdate = faker.date.past();

    const command = new UpdatePetCommand(
      petId,
      undefined,
      newGender,
      undefined,
      undefined,
      newBirthdate,
    );

    await useCase.execute(command);

    const updatedPet = await repository.find(petId);
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(originalPet.getName().toString()); // Unchanged
    expect(updatedPet?.getGender().toString()).toBe(newGender); // Changed
    expect(updatedPet?.getChipId().toString()).toBe(originalPet.getChipId().toString()); // Unchanged
    expect(updatedPet?.isSterilized().getValue()).toBe(originalPet.isSterilized().getValue()); // Unchanged
    expect(updatedPet?.getAnniversaryDate().toISOString()).toBe(
      new DateValueObject(newBirthdate).toISOString(),
    ); // Changed
  });
});
