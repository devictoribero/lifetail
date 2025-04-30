import { PetLifeMoment, PetLifeMomentType } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { RemovePetLifeMomentCommand } from './RemovePetLifeMomentCommand';
import { RemovePetLifeMomentUseCase } from './RemovePetLifeMomentUseCase';

describe('RemovePetLifeMomentUseCase', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let useCase: RemovePetLifeMomentUseCase;

  const mockId = 'moment-id';
  const mockPetLifeMoment = PetLifeMoment.create(
    mockId,
    PetLifeMomentType.Arrival,
    'pet-id',
    'user-id',
    new Date(),
    'Test description'
  );

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new RemovePetLifeMomentUseCase(repository);
  });

  it('should remove a pet life moment from the repository', async () => {
    // First save the moment to the repository
    await repository.save(mockPetLifeMoment);

    // Create the spy BEFORE executing the method
    const repositorySpy = jest.spyOn(repository, 'remove');

    // Then remove it
    const command = new RemovePetLifeMomentCommand(mockId);
    await useCase.execute(command);

    // Verify that remove was called with the correct id
    expect(repositorySpy).toHaveBeenCalledWith(mockId);
  });
});