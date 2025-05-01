import { randomUUID } from 'crypto';
import { Pet } from './Pet';
import { PetGender } from './PetGender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('Pet', () => {
  describe('create', () => {
    it('should create a Pet instance', () => {
      // Arrange
      const id = randomUUID();
      const name = new StringValueObject(faker.animal.cat());
      const gender = Math.random() > 0.5 ? PetGender.Male : PetGender.Female;
      const chipId = new StringValueObject(faker.string.alphanumeric(9));
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthdate = new DateValueObject(faker.date.past());
      const createdAt = new DateValueObject(faker.date.recent());
      const updatedAt = null;

      // Act
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthdate, createdAt, updatedAt);

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName()).toBe(name);
      expect(pet.getGender()).toBe(gender);
      expect(pet.getChipId()).toBe(chipId);
      expect(pet.isSterilized()).toBe(sterilized);
      expect(pet.getBirthdate()).toBe(birthdate);
      expect(pet.getCreatedAt()).toEqual(createdAt);
      expect(pet.getUpdatedAt()).toBeNull();
    });

    it('should create a Pet instance with default timestamps when not provided', () => {
      // Arrange
      const id = randomUUID();
      const name = new StringValueObject(faker.animal.cat());
      const gender = Math.random() > 0.5 ? PetGender.Male : PetGender.Female;
      const chipId = new StringValueObject(faker.string.alphanumeric(9));
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthdate = new DateValueObject(faker.date.past());

      // Act
      const before = new Date();
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthdate);
      const after = new Date();

      // Assert
      expect(pet.getCreatedAt().toDate().getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(pet.getCreatedAt().toDate().getTime()).toBeLessThanOrEqual(after.getTime());
      expect(pet.getUpdatedAt()).toBeNull();
    });
  });

  describe('fromPrimitives', () => {
    it('should create a Pet instance from primitives', () => {
      // Arrange
      const id = randomUUID();
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthdate = faker.date.past();
      const createdAt = faker.date.recent();
      const updatedAt = null;

      // Act
      const pet = Pet.fromPrimitives(
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthdate,
        createdAt,
        updatedAt,
      );

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName().toString()).toBe(name);
      expect(pet.getGender().toString()).toBe(gender);
      expect(pet.getChipId().toString()).toBe(chipId);
      expect(pet.isSterilized().getValue()).toBe(sterilized);
      expect(pet.getBirthdate().toDate()).toEqual(birthdate);
      expect(pet.getCreatedAt().toDate()).toEqual(createdAt);
      expect(pet.getUpdatedAt()).toBeNull();
    });

    it('should create a Pet instance with default timestamps when not provided', () => {
      // Arrange
      const id = randomUUID();
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthdate = faker.date.past();

      // Act
      const before = new Date();
      const pet = Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthdate);
      const after = new Date();

      // Assert
      expect(pet.getCreatedAt().toDate().getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(pet.getCreatedAt().toDate().getTime()).toBeLessThanOrEqual(after.getTime());
      expect(pet.getUpdatedAt()).toBeNull();
    });
  });

  describe('toPrimitives', () => {
    it('should convert Pet instance to primitives including timestamps', () => {
      // Arrange
      const id = randomUUID();
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthdate = faker.date.past();
      const createdAt = faker.date.recent();
      const updatedAt = null;

      const pet = Pet.fromPrimitives(
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthdate,
        createdAt,
        updatedAt,
      );

      // Act
      const primitives = pet.toPrimitives();

      // Assert
      expect(primitives).toEqual({
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthdate: new DateValueObject(birthdate).toISOString(),
        createdAt: createdAt,
        updatedAt: null,
      });
    });
  });

  describe('mutation methods', () => {
    it('should update the updatedAt timestamp when renaming', () => {
      // Arrange
      const pet = Pet.create(
        randomUUID(),
        new StringValueObject(faker.animal.cat()),
        Math.random() > 0.5 ? PetGender.Male : PetGender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(faker.datatype.boolean()),
        new DateValueObject(faker.date.past()),
      );
      expect(pet.getUpdatedAt()).toBeNull();

      // Act
      pet.renameTo(new StringValueObject(faker.animal.cat()));

      // Assert
      expect(pet.getUpdatedAt()).not.toBeNull();
      expect(pet.getUpdatedAt() instanceof DateValueObject).toBe(true);
    });

    it('should update the updatedAt timestamp when changing gender', () => {
      // Arrange
      const initialGender = Math.random() > 0.5 ? PetGender.Male : PetGender.Female;
      const newGender = initialGender === PetGender.Male ? PetGender.Female : PetGender.Male;

      const pet = Pet.create(
        randomUUID(),
        new StringValueObject(faker.animal.cat()),
        initialGender,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(faker.datatype.boolean()),
        new DateValueObject(faker.date.past()),
      );
      expect(pet.getUpdatedAt()).toBeNull();

      // Act
      pet.changeGenderTo(newGender);

      // Assert
      expect(pet.getUpdatedAt()).not.toBeNull();
      expect(pet.getUpdatedAt() instanceof DateValueObject).toBe(true);
      expect(pet.getGender()).toBe(newGender);
    });

    it('should update the updatedAt timestamp when changing sterilization status', () => {
      // Arrange
      const pet = Pet.create(
        randomUUID(),
        new StringValueObject(faker.animal.cat()),
        Math.random() > 0.5 ? PetGender.Male : PetGender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(false),
        new DateValueObject(faker.date.past()),
      );
      expect(pet.getUpdatedAt()).toBeNull();

      // Act
      pet.sterilize();

      // Assert
      expect(pet.getUpdatedAt()).not.toBeNull();
      expect(pet.getUpdatedAt() instanceof DateValueObject).toBe(true);
      expect(pet.isSterilized().getValue()).toBe(true);
    });
  });
});
