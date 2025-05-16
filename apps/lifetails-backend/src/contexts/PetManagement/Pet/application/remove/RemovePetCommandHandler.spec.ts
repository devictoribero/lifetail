import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { RemovePetCommandHandler } from './RemovePetCommandHandler';
import { RemovePetCommand } from './RemovePetCommand';
import { Pet } from '../../domain/entities/Pet';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { Species } from '../../domain/entities/PetSpecies';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('RemovePetCommandHandler', () => {
  let repository: PetRepository;
  let commandHandler: RemovePetCommandHandler;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    commandHandler = new RemovePetCommandHandler(repository);
  });

  it('should throw a PetNotFoundException when the pet does not exist', async () => {
    // Arrange
    const nonExistentId = faker.string.uuid();
    const command = new RemovePetCommand(nonExistentId);

    await expect(commandHandler.handle(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should remove a pet', async () => {
    // Arrange
    const id = faker.string.uuid();
    const name = faker.animal.cat();
    const gender = 'Female';
    const sterilized = faker.datatype.boolean();
    const anniversaryDate = faker.date.past();
    const createdAt = faker.date.recent();
    const ownerId = faker.string.uuid();
    const pet = new Pet({
      id: new UUID(id),
      species: Species.Cat,
      name: new StringValueObject(name),
      gender: Gender.fromPrimitives(gender),
      sterilized: new BooleanValueObject(sterilized),
      anniversaryDate: new DateValueObject(anniversaryDate),
      createdAt: new DateValueObject(createdAt),
      ownerId: new UUID(ownerId),
    });
    await repository.save(pet);
    const petId = new UUID(id);
    const beforeRemoval = await repository.find(petId);
    expect(beforeRemoval).toBeInstanceOf(Pet);
    const removeSpy = jest.spyOn(repository, 'remove');

    // Act
    const command = new RemovePetCommand(id);
    await commandHandler.handle(command);

    // Assert
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(petId);
    const afterRemoval = await repository.find(petId);
    expect(afterRemoval).toBeNull();
  });
});
