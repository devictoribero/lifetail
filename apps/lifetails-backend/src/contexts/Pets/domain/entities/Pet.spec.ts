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

      // Act
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthdate);

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName()).toBe(name);
      expect(pet.getGender()).toBe(gender);
      expect(pet.getChipId()).toBe(chipId);
      expect(pet.isSterilized()).toBe(sterilized);
      expect(pet.getBirthdate()).toBe(birthdate);
      expect(pet.getCreatedAt()).toBeDefined();
    });

    it('can create a Pet instance without specifying the createAt', () => {
      // Arrange
      const id = randomUUID();
      const name = new StringValueObject(faker.animal.cat());
      const gender = Math.random() > 0.5 ? PetGender.Male : PetGender.Female;
      const chipId = new StringValueObject(faker.string.alphanumeric(9));
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthdate = new DateValueObject(faker.date.past());

      // Act
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthdate);

      // Assert
      expect(pet.getCreatedAt().toDate()).not.toBeNull();
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

      // Act
      const pet = Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthdate, createdAt);

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName().toString()).toBe(name);
      expect(pet.getGender().toString()).toBe(gender);
      expect(pet.getChipId().toString()).toBe(chipId);
      expect(pet.isSterilized().getValue()).toBe(sterilized);
      expect(pet.getBirthdate().toDate()).toEqual(birthdate);
      expect(pet.getCreatedAt().toDate()).toEqual(createdAt);
    });
  });

  describe('toPrimitives', () => {
    it('should convert Pet instance to primitives', () => {
      // Arrange
      const id = randomUUID();
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthdate = faker.date.past();
      const createdAt = faker.date.recent();
      const pet = Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthdate, createdAt);

      // Act
      const primitives = pet.toPrimitives();

      // Assert
      expect(primitives).toEqual({
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthdate: birthdate.toISOString(),
        createdAt: createdAt.toISOString(),
      });
    });
  });

  describe('mutation methods', () => {
    it('can be renamed', () => {
      // Arrange
      const initialName = new StringValueObject(faker.animal.cat());
      const pet = Pet.create(
        randomUUID(),
        initialName,
        Math.random() > 0.5 ? PetGender.Male : PetGender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(faker.datatype.boolean()),
        new DateValueObject(faker.date.past()),
      );

      // Act
      pet.renameTo(new StringValueObject(faker.animal.cat()));

      // Assert
      expect(pet.getName().equals(initialName)).toBe(false);
    });

    it('can change gender', () => {
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

      // Act
      pet.changeGenderTo(newGender);

      // Assert
      expect(pet.getGender().equals(newGender)).toBe(true);
    });

    it('can be sterilized', () => {
      // Arrange
      const pet = Pet.create(
        randomUUID(),
        new StringValueObject(faker.animal.cat()),
        Math.random() > 0.5 ? PetGender.Male : PetGender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(false),
        new DateValueObject(faker.date.past()),
      );

      // Act
      pet.sterilize();

      // Assert
      expect(pet.isSterilized().getValue()).toBe(true);
    });
  });
});
