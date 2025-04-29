import { PetLifeMoment, PetLifeMomentType } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentUseCase } from './AddPetLifeMomentUseCase';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { AddPetLifeMomentCommand } from './AddPetLifeMomentCommand';

describe(AddPetLifeMomentUseCase, () => {
  let useCase: AddPetLifeMomentUseCase;
  let repository: PetLifeMomentInMemoryRepository;
  let saveSpy: jest.SpyInstance;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new AddPetLifeMomentUseCase(repository);
    saveSpy = jest.spyOn(repository, 'save');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a pet life moment', async () => {
    const id = randomUUID();
    const type = PetLifeMomentType.Anniversary;
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = new Date();
    const description = faker.lorem.sentence();

    const command = new AddPetLifeMomentCommand(id, type, petId, createdBy, occurredOn, description);

    await useCase.execute(command);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy.mock.calls[0][0].getId()).toBe(id);
    expect(saveSpy.mock.calls[0][0].getType()).toBe(type);
  });
});
