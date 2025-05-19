import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { AddVeterinaryCommand } from './AddVeterinaryCommand';
import { AddVeterinaryCommandHandler } from './AddVeterinaryCommandHandler';
import { faker } from '@faker-js/faker';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';

describe('AddVeterinaryCommandHandler', () => {
  let handler: AddVeterinaryCommandHandler;
  let repository: VeterinaryRepository;

  beforeEach(() => {
    repository = new VeterinaryInMemoryRepository();
    handler = new AddVeterinaryCommandHandler(repository);
  });

  it('should save a veterinary', async () => {
    // Given
    const id = faker.string.uuid();
    const name = faker.company.name();
    const command = new AddVeterinaryCommand(id, name);

    // When
    await handler.handle(command);

    // Then
    const savedVeterinary = await repository.find(new UUID(id));
    expect(savedVeterinary).not.toBeNull();
    expect(savedVeterinary?.getId().toString()).toBe(id);
    expect(savedVeterinary?.getName().toString()).toBe(name);
  });
});
