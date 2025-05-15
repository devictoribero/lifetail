import { Test } from '@nestjs/testing';
import { VeterinaryInMemoryRepository } from './VeterinaryInMemoryRepository';
import { Veterinary } from '../domain/entities/Veterinary';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { faker } from '@faker-js/faker';

describe('VeterinaryInMemoryRepository', () => {
  let repository: VeterinaryInMemoryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [VeterinaryInMemoryRepository],
    }).compile();

    repository = module.get<VeterinaryInMemoryRepository>(VeterinaryInMemoryRepository);
  });

  describe('save', () => {
    it('should save a veterinary', async () => {
      // Arrange
      const id = UUID.create();
      const name = new StringValueObject('Animal Hospital');
      const veterinary = Veterinary.create(id, name);

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
      const id = UUID.create();
      const name = new StringValueObject('Animal Hospital');
      const newName = new StringValueObject('Updated Hospital');
      const veterinary = Veterinary.create(id, name);

      // Act
      await repository.save(veterinary);
      veterinary.rename(newName);
      await repository.save(veterinary);

      // Assert
      const found = await repository.find(id);
      expect(found).not.toBeNull();
      expect(found?.getName().toString()).toBe(newName.toString());
    });
  });

  describe('find', () => {
    it('should return null when veterinary does not exist', async () => {
      // Arrange
      const id = UUID.create();

      // Act
      const result = await repository.find(id);

      // Assert
      expect(result).toBeNull();
    });

    it('should find a veterinary when it exists', async () => {
      // Arrange
      const id = UUID.create();
      const name = new StringValueObject('Animal Hospital');
      const address = new StringValueObject('123 Main St');
      const email = new EmailValueObject('info@hospital.com');
      const primaryPhone = new StringValueObject('555-1234');
      const veterinary = Veterinary.create(id, name, address, email, primaryPhone);

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
      const id = UUID.create();
      const name = new StringValueObject('Animal Hospital');
      const veterinary = Veterinary.create(id, name);

      // Act
      await repository.save(veterinary);
      await repository.remove(id);
      const found = await repository.find(id);

      // Assert
      expect(found).toBeNull();
    });
  });

  describe('remove', () => {
    it('should mark a veterinary as deleted', async () => {
      // Arrange
      const id = UUID.create();
      const name = new StringValueObject('Animal Hospital');
      const veterinary = Veterinary.create(id, name);

      // Act
      await repository.save(veterinary);
      await repository.remove(id);

      // Assert
      const found = await repository.find(id);
      expect(found).toBeNull();
    });

    it('should not throw error when removing non-existent veterinary', async () => {
      // Arrange
      const id = UUID.create();

      // Act & Assert
      await expect(repository.remove(id)).resolves.not.toThrow();
    });
  });
});
