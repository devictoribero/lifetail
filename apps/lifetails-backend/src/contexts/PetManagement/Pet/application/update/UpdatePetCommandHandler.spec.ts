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
import { PetRepository } from '../../domain/repositories/PetRepository';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';

describe('UpdatePetCommandHandler', () => {
  let repository: jest.Mocked<PetRepository>;
  let commandHandler: UpdatePetCommandHandler;
  let petId: string;
  let originalPet: Pet;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    commandHandler = new UpdatePetCommandHandler(repository);
  });

  it('should throw a PetNotFoundException error when pet does not exist', async () => {
    const command = new UpdatePetCommand(faker.string.uuid(), faker.animal.cat());

    await expect(commandHandler.handle(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should update all pet fields when all are provided', async () => {
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const newName = faker.animal.cat();
    const newGender = 'FEMALE';
    const newChipId = faker.string.numeric(9);
    const newSterilized = faker.datatype.boolean();
    const newBirthdate = faker.date.past();
    const newArrivalDate = faker.date.past();
    const newColor = faker.color.human();
    const command = new UpdatePetCommand(
      pet.getId().toString(),
      newName,
      newGender,
      newSterilized,
      newBirthdate,
      newArrivalDate,
      newChipId,
      newColor,
    );
    const saveSpy = jest.spyOn(repository, 'save');
    const findSpy = jest.spyOn(repository, 'find');

    await commandHandler.handle(command);

    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      name: new StringValueObject(newName),
      gender: Gender.fromPrimitives(newGender),
      microchipNumber: new StringValueObject(newChipId),
      sterilized: new BooleanValueObject(newSterilized),
      birthDate: new DateValueObject(newBirthdate),
      arrivalDate: new DateValueObject(newArrivalDate),
      color: new StringValueObject(newColor),
    });
  });

  it('should update only name when only name is provided', async () => {
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const newName = faker.animal.cat();
    const command = new UpdatePetCommand(pet.getId().toString(), newName);
    const saveSpy = jest.spyOn(repository, 'save');
    const findSpy = jest.spyOn(repository, 'find');

    await commandHandler.handle(command);

    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      name: new StringValueObject(newName),
    });
  });

  it('should update only gender when only that is provided', async () => {
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const newGender = 'FEMALE';
    const command = new UpdatePetCommand(
      pet.getId().toString(),
      undefined,
      newGender,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    await commandHandler.handle(command);

    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      gender: Gender.fromPrimitives(newGender),
    });
  });

  it('should update only sterilized status when only that is provided', async () => {
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const sterilized = true;
    const command = new UpdatePetCommand(
      pet.getId().toString(),
      undefined,
      undefined,
      sterilized,
      undefined,
      undefined,
      undefined,
      undefined,
    );
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    await commandHandler.handle(command);

    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      sterilized: new BooleanValueObject(sterilized),
    });
  });

  it('should update the birth date when provided', async () => {
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const newBirthdate = faker.date.past();
    const command = new UpdatePetCommand(
      pet.getId().toString(),
      undefined,
      undefined,
      undefined,
      newBirthdate,
      undefined,
      undefined,
      undefined,
    );
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    await commandHandler.handle(command);

    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      birthDate: new DateValueObject(newBirthdate),
    });
  });

  it('should update the arrival date when provided', async () => {
    const pet = PetObjectMother.create();
    repository.find.mockResolvedValue(pet);
    const newArrivalDate = faker.date.past();
    const command = new UpdatePetCommand(
      pet.getId().toString(),
      undefined,
      undefined,
      undefined,
      undefined,
      newArrivalDate,
      undefined,
      undefined,
    );
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    await commandHandler.handle(command);

    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      arrivalDate: new DateValueObject(newArrivalDate),
    });
  });
});
