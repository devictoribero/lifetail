import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentUseCase } from './AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from './AddPetLifeMomentCommand';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';

describe('AddPetLifeMomentUseCase', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let useCase: AddPetLifeMomentUseCase;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new AddPetLifeMomentUseCase(repository);
  });

  it('should add a pet life moment', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = 'Annual checkup, all looking good';

    const command = new AddPetLifeMomentCommand(
      id,
      type,
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
    expect(savedMoment).toBeInstanceOf(PetLifeMoment);
    expect(savedMoment.getId()).toBe(id);
    expect(savedMoment.getType().toString()).toBe(type);
    expect(savedMoment.getTheme().toString()).toBe('Wellness');
    expect(savedMoment.getPetId()).toBe(petId);
    expect(savedMoment.getCreatedBy()).toBe(createdBy);
    expect(savedMoment.getOccurredOn().toISOString()).toBe(occurredOn.toISOString());
    expect(savedMoment.getDescription().toString()).toBe(description);
  });
});
