import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { RemovePetLifeMomentCommandHandler } from './RemovePetLifeMomentCommandHandler';
import { RemovePetLifeMomentCommand } from './RemovePetLifeMomentCommand';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { randomUUID } from 'node:crypto';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';

describe('RemovePetLifeMomentCommandHandler', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let commandHandler: RemovePetLifeMomentCommandHandler;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    commandHandler = new RemovePetLifeMomentCommandHandler(repository);
  });

  it('should throw a PetLifeMomentNotFoundException when the pet life moment does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const command = new RemovePetLifeMomentCommand(nonExistentId);

    await expect(commandHandler.execute(command)).rejects.toThrow(PetLifeMomentNotFoundException);
  });

  it('should remove a pet life moment', async () => {
    // Arrange
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = 'Annual checkup, all looking good';
    // Create and save a pet life moment
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.fromPrimitives(type),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );
    await repository.save(petLifeMoment);
    // Verify the pet life moment exists before removal
    const beforeRemoval = await repository.find(id);
    expect(beforeRemoval).not.toBeNull();
    const removeSpy = jest.spyOn(repository, 'remove');
    const command = new RemovePetLifeMomentCommand(id);

    // Act
    await commandHandler.execute(command);

    // Assert
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(id);
    // Verify the pet life moment no longer exists
    const afterRemoval = await repository.find(id);
    expect(afterRemoval).toBeNull();
  });
});
