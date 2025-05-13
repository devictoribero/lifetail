import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { UpdatePetCommandHandler } from './UpdatePetCommandHandler';
import { UpdatePetCommand } from './UpdatePetCommand';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('UpdatePetCommandHandler', () => {
  let repository: PetInMemoryRepository;
  let commandHandler: UpdatePetCommandHandler;
  let petId: string;
  let originalPet: Pet;

  beforeEach(async () => {
    repository = new PetInMemoryRepository();
    commandHandler = new UpdatePetCommandHandler(repository);

    // Create a pet for testing
    petId = faker.string.uuid();
    originalPet = new Pet(
      new UUID(petId),
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.fromPrimitives('Male'),
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
      new DateValueObject(faker.date.past()),
      new UUID(faker.string.uuid()),
      new StringValueObject(faker.string.numeric(9)),
    );

    await repository.save(originalPet);
  });

  it('should throw a PetNotFoundException error when pet does not exist', async () => {
    const command = new UpdatePetCommand(faker.string.uuid(), faker.animal.cat());

    await expect(commandHandler.execute(command)).rejects.toThrow(PetNotFoundException);
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

    await commandHandler.execute(command);

    const updatedPet = await repository.find(new UUID(petId));

    const updatedPetPrimitives = updatedPet.toPrimitives();
    expect(updatedPet).toBeInstanceOf(Pet);
    expect(updatedPetPrimitives.id).toBe(petId);
    expect(updatedPetPrimitives.name).toBe(newName);
    expect(updatedPetPrimitives.gender).toBe(newGender);
    expect(updatedPetPrimitives.chipId).toBe(newChipId);
    expect(updatedPetPrimitives.sterilized).toBe(newSterilized);
    expect(updatedPetPrimitives.anniversaryDate).toBe(
      new DateValueObject(newBirthdate).toISOString(),
    );
  });

  it('should update only name when only name is provided', async () => {
    const newName = faker.animal.cat();
    const command = new UpdatePetCommand(petId, newName);

    await commandHandler.execute(command);

    const updatedPet = await repository.find(new UUID(petId));
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

    await commandHandler.execute(command);

    const updatedPet = await repository.find(new UUID(petId));
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

    await commandHandler.execute(command);

    const updatedPet = await repository.find(new UUID(petId));
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
