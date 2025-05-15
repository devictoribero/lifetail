import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { GetVeterinaryGQLQuery } from './GetVeterinaryGQLQuery';
import { GetVeterinaryQueryHandler } from 'src/contexts/PetManagement/Veterinaries/application/GetVeterinary/GetVeterinaryQueryHandler';
import { GetVeterinaryInput } from './GetVeterinaryInput';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from 'src/contexts/PetManagement/Veterinaries/domain/entities/Veterinary';
import { VeterinaryNotFoundException } from 'src/contexts/PetManagement/Veterinaries/domain/exceptions/VeterinaryNotFoundException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { Reflector } from '@nestjs/core';

describe('GetVeterinaryGQLQuery', () => {
  let query: GetVeterinaryGQLQuery;
  let queryHandler: jest.Mocked<GetVeterinaryQueryHandler>;
  let mockContext: any;
  let userId: string;

  beforeEach(async () => {
    // Mock the query handler
    queryHandler = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<GetVeterinaryQueryHandler>;

    // Mock user context
    userId = faker.string.uuid();
    mockContext = {
      req: {
        user: { id: userId, accountId: faker.string.uuid() },
        headers: { authorization: 'Bearer some-token' },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetVeterinaryGQLQuery,
        {
          provide: GetVeterinaryQueryHandler,
          useValue: queryHandler,
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
        {
          provide: AuthenticationRequired,
          useValue: { canActivate: jest.fn().mockResolvedValue(true) },
        },
      ],
    })
      .overrideGuard(AuthenticationRequired)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile();

    query = module.get<GetVeterinaryGQLQuery>(GetVeterinaryGQLQuery);
  });

  it('should be defined', () => {
    expect(query).toBeDefined();
  });

  it('should return a veterinary when it exists', async () => {
    // Arrange
    const id = faker.string.uuid();
    const veterinary = Veterinary.create(new UUID(id), new StringValueObject('Test Veterinary'));
    queryHandler.handle.mockResolvedValue(veterinary);
    const input: GetVeterinaryInput = { id };

    // Act
    const result = await query.getVeterinary(input);

    // Assert
    expect(queryHandler.handle).toHaveBeenCalledWith(expect.objectContaining({ id: input.id }));
    expect(result).toEqual({
      id: id,
      name: 'Test Veterinary',
      address: null,
      email: null,
      primaryPhone: null,
      emergencyPhone: null,
      notes: null,
      createdAt: expect.any(String),
      updatedAt: null,
      deletedAt: null,
    });
  });

  it('should throw an error when veterinary is not found', async () => {
    // Arrange
    const id = faker.string.uuid();
    const input: GetVeterinaryInput = { id };
    queryHandler.handle.mockRejectedValue(new VeterinaryNotFoundException(new UUID(id)));

    // Act & Assert
    await expect(query.getVeterinary(input)).rejects.toThrow(`Veterinary not found: ${id}`);
  });

  it('should propagate unexpected errors', async () => {
    // Arrange
    const id = faker.string.uuid();
    const input: GetVeterinaryInput = { id };
    const errorMessage = 'Unexpected error';
    queryHandler.handle.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(query.getVeterinary(input)).rejects.toThrow(errorMessage);
  });
});
