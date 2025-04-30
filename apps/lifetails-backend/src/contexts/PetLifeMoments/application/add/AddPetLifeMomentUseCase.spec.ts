import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentUseCase } from './AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from './AddPetLifeMomentCommand';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { randomUUID } from 'node:crypto';

describe('AddPetLifeMomentUseCase', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let useCase: AddPetLifeMomentUseCase;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new AddPetLifeMomentUseCase(repository);
  });

  it('should create and save a pet life moment', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const momentId = randomUUID();
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = new Date('2023-05-15T10:00:00Z');
    const description = 'Annual checkup, all looking good';

    const command = new AddPetLifeMomentCommand(
      momentId,
      'VeterinaryVisit',
      petId,
      createdBy,
      occurredOn,
      description,
    );

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    // Verify the repository was called with the correct PetLifeMoment entity
    const savedMoment = saveSpy.mock.calls[0][0] as PetLifeMoment;
    expect(savedMoment.getId()).toBe(momentId);
    expect(savedMoment.getType().toString()).toBe('VeterinaryVisit');
    expect(savedMoment.getPetId()).toBe(petId);
    expect(savedMoment.getCreatedBy()).toBe(createdBy);
    expect(savedMoment.getOccurredOn().toISOString()).toBe(occurredOn.toISOString());
    expect(savedMoment.getDescription().toString()).toBe(description);
  });

  it('should call repository save method with expected parameters', async () => {
    // Arrange
    const saveMock = jest.fn();
    repository.save = saveMock;
    const momentId = randomUUID();
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = new Date('2023-06-20T14:30:00Z');
    const description = 'Summer haircut and nail trim';

    const command = new AddPetLifeMomentCommand(
      momentId,
      'GroomingVisit',
      petId,
      createdBy,
      occurredOn,
      description,
    );

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveMock).toHaveBeenCalledTimes(1);
    const savedMoment = saveMock.mock.calls[0][0];
    expect(savedMoment).toBeInstanceOf(PetLifeMoment);
  });
});
