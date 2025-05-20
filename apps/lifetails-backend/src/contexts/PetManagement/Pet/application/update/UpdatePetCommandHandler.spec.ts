import { Pet } from '../../domain/entities/Pet';
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
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';

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
    originalPet = new Pet({
      id: new UUID(petId),
      species: Species.Cat,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.fromPrimitives('Male'),
      sterilized: new BooleanValueObject(faker.datatype.boolean()),
      anniversaryDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.past()),
      ownerId: new UUID(faker.string.uuid()),
      microchipNumber: new StringValueObject(faker.string.numeric(9)),
      color: new StringValueObject('White'),
    });

    await repository.save(originalPet);
  });

  it('should throw a PetNotFoundException error when pet does not exist', async () => {
    const command = new UpdatePetCommand(faker.string.uuid(), faker.animal.cat());

    await expect(commandHandler.handle(command)).rejects.toThrow(PetNotFoundException);
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

    await commandHandler.handle(command);

    const updatedPet = await repository.find(new UUID(petId));

    const updatedPetPrimitives = updatedPet.toPrimitives();
    expect(updatedPet).toBeInstanceOf(Pet);
    expect(updatedPetPrimitives.id).toBe(petId);
    expect(updatedPetPrimitives.name).toBe(newName);
    expect(updatedPetPrimitives.gender).toBe(newGender);
    expect(updatedPetPrimitives.microchipNumber).toBe(newChipId);
    expect(updatedPetPrimitives.sterilized).toBe(newSterilized);
    expect(updatedPetPrimitives.anniversaryDate).toBe(
      new DateValueObject(newBirthdate).toISOString(),
    );
  });

  it('should update only name when only name is provided', async () => {
    const newName = faker.animal.cat();
    const command = new UpdatePetCommand(petId, newName);

    await commandHandler.handle(command);

    const updatedPet = await repository.find(new UUID(petId));
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(newName);
    expect(updatedPet?.getGender().toString()).toBe(originalPet.getGender().toString()); // Unchanged
    expect(updatedPet?.getMicrochipNumber().toString()).toBe(
      originalPet.getMicrochipNumber().toString(),
    ); // Unchanged
    expect(updatedPet?.isSterilized().getValue()).toBe(originalPet.isSterilized().getValue()); // Unchanged
    expect(updatedPet?.getAnniversaryDate().toISOString()).toBe(
      originalPet.getAnniversaryDate().toISOString(),
    ); // Unchanged
  });

  it('should update only sterilized status when only that is provided', async () => {
    // Recreate pet with known sterilized status
    const knownSterilizedStatus = true;
    originalPet = new Pet({
      id: new UUID(petId),
      species: Species.Cat,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.fromPrimitives('Male'),
      sterilized: new BooleanValueObject(knownSterilizedStatus),
      anniversaryDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.past()),
      ownerId: new UUID(faker.string.uuid()),
      microchipNumber: new StringValueObject(faker.string.numeric(9)),
      color: new StringValueObject('White'),
    });
    await repository.save(originalPet);

    // Set to opposite of current value
    const newSterilized = !knownSterilizedStatus;
    const command = new UpdatePetCommand(petId, undefined, undefined, undefined, newSterilized);

    await commandHandler.handle(command);

    const updatedPet = await repository.find(new UUID(petId));
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(originalPet.getName().toString()); // Unchanged
    expect(updatedPet?.getGender().toString()).toBe(originalPet.getGender().toString()); // Unchanged
    expect(updatedPet?.getMicrochipNumber().toString()).toBe(
      originalPet.getMicrochipNumber().toString(),
    ); // Unchanged
    expect(updatedPet?.isSterilized().getValue()).toBe(newSterilized); // Changed to the opposite
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

    await commandHandler.handle(command);

    const updatedPet = await repository.find(new UUID(petId));
    expect(updatedPet).not.toBeNull();
    expect(updatedPet?.getName().toString()).toBe(originalPet.getName().toString()); // Unchanged
    expect(updatedPet?.getGender().toString()).toBe(newGender); // Changed
    expect(updatedPet?.getMicrochipNumber().toString()).toBe(
      originalPet.getMicrochipNumber().toString(),
    ); // Unchanged
    expect(updatedPet?.isSterilized().getValue()).toBe(originalPet.isSterilized().getValue()); // Unchanged
    expect(updatedPet?.getAnniversaryDate().toISOString()).toBe(
      new DateValueObject(newBirthdate).toISOString(),
    ); // Changed
  });
});
