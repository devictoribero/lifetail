import { faker } from '@faker-js/faker';
import { GetVeterinaryQueryHandler } from './GetVeterinaryQueryHandler';
import { GetVeterinaryQuery } from './GetVeterinaryQuery';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';
import { VeterinaryObjectMother } from '../../domain/entities/VeterinaryObjectMother.spec';

describe('GetVeterinaryQueryHandler', () => {
  let queryHandler: GetVeterinaryQueryHandler;
  let repository: jest.Mocked<VeterinaryRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<VeterinaryRepository>;
    queryHandler = new GetVeterinaryQueryHandler(repository);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const query = new GetVeterinaryQuery(id);
    repository.find.mockResolvedValue(null);

    // Act/Assert
    await expect(queryHandler.handle(query)).rejects.toThrow(VeterinaryNotFoundException);
  });

  it('should return a veterinary when it exists', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    repository.find.mockResolvedValue(veterinary);
    const query = new GetVeterinaryQuery(id);
    const findSpy = jest.spyOn(repository, 'find');

    // Act
    const result = await queryHandler.handle(query);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(result).toEqual(veterinary);
  });
});
