import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { UpdatePetLifeMomentUseCase } from './UpdatePetLifeMomentUseCase';
import { UpdatePetLifeMomentCommand } from './UpdatePetLifeMomentCommand';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { randomUUID } from 'node:crypto';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('UpdatePetLifeMomentUseCase', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let useCase: UpdatePetLifeMomentUseCase;
  let id: string;
  let petLifeMoment: PetLifeMoment;

  beforeEach(async () => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new UpdatePetLifeMomentUseCase(repository);

    // Create a test pet life moment
    id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();

    petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.fromPrimitives(type),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );

    await repository.save(petLifeMoment);
  });

  it('should throw PetLifeMomentNotFoundException when moment does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const command = new UpdatePetLifeMomentCommand(nonExistentId, faker.lorem.sentence());

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow(
      new PetLifeMomentNotFoundException(nonExistentId),
    );
  });

  it('should update description when provided', async () => {
    // Arrange
    const newDescription = faker.lorem.sentence();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdatePetLifeMomentCommand(id, newDescription);

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getDescription().toString()).toBe(newDescription);
  });

  it('should update occurredOn date when provided', async () => {
    // Arrange
    const newDate = faker.date.future();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdatePetLifeMomentCommand(id, undefined, newDate);

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getOccurredOn().toISOString()).toBe(
      new DateValueObject(newDate).toISOString(),
    );
  });

  it('should update petId when provided', async () => {
    // Arrange
    const newPetId = randomUUID();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdatePetLifeMomentCommand(id, undefined, undefined, newPetId);

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getPetId()).toBe(newPetId);
  });

  it('should update multiple fields when provided', async () => {
    // Arrange
    const newDescription = faker.lorem.sentence();
    const newDate = faker.date.future();
    const newPetId = randomUUID();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdatePetLifeMomentCommand(id, newDescription, newDate, newPetId);

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getDescription().toString()).toBe(newDescription);
    expect(updatedMoment?.getOccurredOn().toISOString()).toBe(
      new DateValueObject(newDate).toISOString(),
    );
    expect(updatedMoment?.getPetId()).toBe(newPetId);
  });
});
