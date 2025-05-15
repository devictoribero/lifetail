import { Test } from '@nestjs/testing';
import { VeterinaryInMemoryRepository } from './VeterinaryInMemoryRepository';
import { Veterinary } from '../domain/entities/Veterinary';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

describe('VeterinaryInMemoryRepository', () => {
  let repository: VeterinaryInMemoryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [VeterinaryInMemoryRepository],
    }).compile();

    repository = module.get<VeterinaryInMemoryRepository>(VeterinaryInMemoryRepository);
  });

  it('should save a veterinary', async () => {
    // Arrange
    const id = UUID.generate();
    const name = new StringValueObject('Animal Hospital');
    const veterinary = Veterinary.create({ id, name });

    // Act
    await repository.save(veterinary);

    // Assert
    const found = await repository.find(id);
    expect(found).not.toBeNull();
    expect(found?.getId().toString()).toBe(id.toString());
    expect(found?.getName().toString()).toBe(name.toString());
  });

  it('should update an existing veterinary', async () => {
    // Arrange
    const id = UUID.generate();
    const name = new StringValueObject('Animal Hospital');
    const newName = new StringValueObject('Updated Hospital');
    const veterinary = Veterinary.create({ id, name });

    // Act
    await repository.save(veterinary);
    veterinary.rename(newName);
    await repository.save(veterinary);

    // Assert
    const found = await repository.find(id);
    expect(found).not.toBeNull();
    expect(found?.getName().toString()).toBe(newName.toString());
  });

  it('should return null when veterinary does not exist', async () => {
    // Arrange
    const id = UUID.generate();

    // Act
    const result = await repository.find(id);

    // Assert
    expect(result).toBeNull();
  });

  it('should find a veterinary when it exists', async () => {
    // Arrange
    const id = UUID.generate();
    const name = new StringValueObject('Animal Hospital');
    const address = new StringValueObject('123 Main St');
    const email = new EmailValueObject('info@hospital.com');
    const primaryPhone = new StringValueObject('555-1234');
    const veterinary = new Veterinary({
      id,
      name,
      address,
      email,
      primaryPhone,
      createdAt: new DateValueObject(new Date()),
    });

    // Act
    await repository.save(veterinary);
    const found = await repository.find(id);

    // Assert
    expect(found).not.toBeNull();
    expect(found?.getName().toString()).toBe(name.toString());
    expect(found?.getAddress()?.toString()).toBe(address.toString());
    expect(found?.getEmail()?.toString()).toBe(email.toString());
    expect(found?.getPrimaryPhone()?.toString()).toBe(primaryPhone.toString());
  });

  it('should return null for deleted veterinaries', async () => {
    // Arrange
    const id = UUID.generate();
    const name = new StringValueObject('Animal Hospital');
    const veterinary = Veterinary.create({ id, name });

    // Act
    veterinary.markAsDeleted();
    await repository.save(veterinary);
    const found = await repository.find(id);

    // Assert
    expect(found).toBeNull();
  });
});
