import { faker } from '@faker-js/faker';
import { GetVeterinaryQueryHandler } from './GetVeterinaryQueryHandler';
import { GetVeterinaryQuery } from './GetVeterinaryQuery';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';

describe('GetVeterinaryQueryHandler', () => {
  let queryHandler: GetVeterinaryQueryHandler;
  let repository: VeterinaryRepository;

  beforeEach(() => {
    repository = new VeterinaryInMemoryRepository();
    queryHandler = new GetVeterinaryQueryHandler(repository);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Given
    const id = faker.string.uuid();
    const query = new GetVeterinaryQuery(id);

    // When/Then
    await expect(queryHandler.handle(query)).rejects.toThrow(VeterinaryNotFoundException);
  });

  it('should return a veterinary when it exists', async () => {
    // Given
    const id = faker.string.uuid();
    const veterinary = Veterinary.create({
      id: new UUID(id),
      name: new StringValueObject('Test Veterinary'),
    });
    await repository.save(veterinary);
    const query = new GetVeterinaryQuery(id);

    // When
    const result = await queryHandler.handle(query);

    // Then
    expect(result).not.toBeNull();
    expect(result.getId().toString()).toBe(id);
    expect(result.getName().toString()).toBe('Test Veterinary');
  });
});
