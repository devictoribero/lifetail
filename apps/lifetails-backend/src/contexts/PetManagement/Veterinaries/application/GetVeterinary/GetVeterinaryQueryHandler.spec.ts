import { faker } from '@faker-js/faker';
import { GetVeterinaryQueryHandler } from './GetVeterinaryQueryHandler';
import { GetVeterinaryQuery } from './GetVeterinaryQuery';
import { VETERINARY_REPOSITORY } from '../../domain/repositories/VeterinaryRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';

describe('GetVeterinaryQueryHandler', () => {
  let queryHandler: GetVeterinaryQueryHandler;
  let repository: any;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
    };

    queryHandler = new GetVeterinaryQueryHandler(repository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
  });

  it('should return a veterinary when it exists', async () => {
    // Arrange
    const id = faker.string.uuid();
    const veterinary = Veterinary.create(new UUID(id), new StringValueObject('Test Veterinary'));
    repository.find.mockResolvedValue(veterinary);

    // Act
    const result = await queryHandler.handle(new GetVeterinaryQuery(id));

    // Assert
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(result).toBe(veterinary);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Arrange
    const id = faker.string.uuid();
    repository.find.mockResolvedValue(null);

    // Act & Assert
    await expect(queryHandler.handle(new GetVeterinaryQuery(id))).rejects.toThrow(
      VeterinaryNotFoundException,
    );
  });
});
