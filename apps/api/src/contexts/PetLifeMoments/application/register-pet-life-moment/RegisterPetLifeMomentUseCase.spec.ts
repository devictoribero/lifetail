import { PetLifeMoment, PetLifeMomentType } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { RegisterPetLifeMomentCommand } from './RegisterPetLifeMomentCommand';
import { RegisterPetLifeMomentUseCase } from './RegisterPetLifeMomentUseCase';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

describe('RegisterPetLifeMomentUseCase', () => {
  let useCase: RegisterPetLifeMomentUseCase;
  let repository: PetLifeMomentInMemoryRepository;
  let saveSpy: jest.SpyInstance;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new RegisterPetLifeMomentUseCase(repository);
    saveSpy = jest.spyOn(repository, 'save');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new pet life moment in the repository', async () => {
    // Arrange
    const id = randomUUID();
    const eventType = 'Anniversary';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();

    const command = new RegisterPetLifeMomentCommand(
      id,
      eventType,
      petId,
      createdBy,
      occurredOn,
      description,
    );

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);
    const savedPetLifeMoment = saveSpy.mock.calls[0][0];
    expect(savedPetLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(savedPetLifeMoment.getId()).toBe(id);
    expect(savedPetLifeMoment.getEventType()).toBe(PetLifeMomentType.Anniversary);
    expect(savedPetLifeMoment.getPetId()).toBe(petId);
    expect(savedPetLifeMoment.getCreatedBy()).toBe(createdBy);
    expect(savedPetLifeMoment.getOccurredOn()).toBe(occurredOn);
    expect(savedPetLifeMoment.getDescription()).toBe(description);
  });

  it('should pass through any exceptions thrown by the domain entity', async () => {
    // Arrange
    const id = randomUUID();
    const invalidEventType = 'InvalidType';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();

    const command = new RegisterPetLifeMomentCommand(
      id,
      invalidEventType,
      petId,
      createdBy,
      occurredOn,
      description,
    );

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow(
      `Unknown pet life moment type: ${invalidEventType}`,
    );
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should create moments with different event types correctly', async () => {
    // Arrange
    const id = randomUUID();
    const eventType = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();

    const command = new RegisterPetLifeMomentCommand(
      id,
      eventType,
      petId,
      createdBy,
      occurredOn,
      description,
    );

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);
    const savedPetLifeMoment = saveSpy.mock.calls[0][0];
    expect(savedPetLifeMoment.getEventType()).toBe(PetLifeMomentType.VeterinaryVisit);
  });
});
