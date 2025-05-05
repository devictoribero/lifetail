import { randomUUID } from 'crypto';
import { Pet } from './Pet';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('Pet', () => {
  let id: string;
  let userId: string;

  beforeEach(() => {
    id = faker.string.uuid();
    userId = faker.string.uuid();
  });

  describe('create', () => {
    it('should create a Pet instance', () => {
      // Arrange
      const name = new StringValueObject(faker.animal.cat());
      const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
      const chipId = new StringValueObject(faker.string.alphanumeric(9));
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthDate = new DateValueObject(faker.date.past());

      // Act
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthDate, userId);

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName()).toBe(name);
      expect(pet.getGender()).toBe(gender);
      expect(pet.getChipId()).toBe(chipId);
      expect(pet.isSterilized()).toBe(sterilized);
      expect(pet.getBirthdate()).toBe(birthDate);
      expect(pet.getCreatedAt()).toBeDefined();
      expect(pet.getMemorialDate()).toBeNull();
    });

    it('should create a Pet instance with memorial date', () => {
      // Arrange
      const name = new StringValueObject(faker.animal.cat());
      const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
      const chipId = new StringValueObject(faker.string.alphanumeric(9));
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthDate = new DateValueObject(faker.date.past());
      const memorialDate = new DateValueObject(faker.date.recent());

      // Act
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthDate, userId, memorialDate);

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getMemorialDate()).toBe(memorialDate);
    });

    it('can create a Pet instance without specifying the createAt', () => {
      // Arrange
      const name = new StringValueObject(faker.animal.cat());
      const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
      const chipId = new StringValueObject(faker.string.alphanumeric(9));
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthDate = new DateValueObject(faker.date.past());

      // Act
      const pet = Pet.create(id, name, gender, chipId, sterilized, birthDate, userId);

      // Assert
      expect(pet.getCreatedAt().toDate()).not.toBeNull();
    });
  });

  describe('fromPrimitives', () => {
    it('should create a Pet instance from primitives', () => {
      // Arrange
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthDate = faker.date.past();
      const createdAt = faker.date.recent();

      // Act
      const pet = Pet.fromPrimitives(
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthDate,
        createdAt,
        userId,
      );

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName().toString()).toBe(name);
      expect(pet.getGender().toString()).toBe(gender);
      expect(pet.getChipId().toString()).toBe(chipId);
      expect(pet.isSterilized().getValue()).toBe(sterilized);
      expect(pet.getBirthdate().toDate()).toEqual(birthDate);
      expect(pet.getCreatedAt().toDate()).toEqual(createdAt);
      expect(pet.getMemorialDate()).toBeNull();
    });

    it('should create a Pet instance from primitives with memorial date', () => {
      // Arrange
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthDate = faker.date.past();
      const createdAt = faker.date.recent();
      const memorialDate = faker.date.recent();

      // Act
      const pet = Pet.fromPrimitives(
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthDate,
        createdAt,
        userId,
        memorialDate,
      );

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getMemorialDate()?.toDate()).toEqual(memorialDate);
    });
  });

  describe('toPrimitives', () => {
    it('should convert Pet instance to primitives', () => {
      // Arrange
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthDate = faker.date.past();
      const createdAt = faker.date.recent();
      const pet = Pet.fromPrimitives(
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthDate,
        createdAt,
        userId,
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
        birthDate: birthDate.toISOString(),
        createdAt: createdAt.toISOString(),
        memorialDate: undefined,
        userId,
      });
    });

    it('should convert Pet instance with memorial date to primitives', () => {
      // Arrange
      const name = faker.animal.cat();
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const chipId = faker.string.alphanumeric(9);
      const sterilized = faker.datatype.boolean();
      const birthDate = faker.date.past();
      const createdAt = faker.date.recent();
      const memorialDate = faker.date.recent();
      const pet = Pet.fromPrimitives(
        id,
        name,
        gender,
        chipId,
        sterilized,
        birthDate,
        createdAt,
        userId,
        memorialDate,
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
        birthDate: birthDate.toISOString(),
        createdAt: createdAt.toISOString(),
        userId,
        memorialDate: memorialDate.toISOString(),
      });
    });
  });

  describe('mutation methods', () => {
    it('can be renamed', () => {
      // Arrange
      const initialName = new StringValueObject(faker.animal.cat());
      const pet = Pet.create(
        id,
        initialName,
        Math.random() > 0.5 ? Gender.Male : Gender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(faker.datatype.boolean()),
        new DateValueObject(faker.date.past()),
        userId,
      );

      // Act
      pet.renameTo(new StringValueObject(faker.animal.cat()));

      // Assert
      expect(pet.getName().equals(initialName)).toBe(false);
    });

    it('can change gender', () => {
      // Arrange
      const initialGender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
      const newGender = initialGender === Gender.Male ? Gender.Female : Gender.Male;

      const pet = Pet.create(
        id,
        new StringValueObject(faker.animal.cat()),
        initialGender,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(faker.datatype.boolean()),
        new DateValueObject(faker.date.past()),
        userId,
      );

      // Act
      pet.changeGenderTo(newGender);

      // Assert
      expect(pet.getGender().equals(newGender)).toBe(true);
    });

    it('can be sterilized', () => {
      // Arrange
      const pet = Pet.create(
        id,
        new StringValueObject(faker.animal.cat()),
        Math.random() > 0.5 ? Gender.Male : Gender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(false),
        new DateValueObject(faker.date.past()),
        userId,
      );

      // Act
      pet.sterilize();

      // Assert
      expect(pet.isSterilized().getValue()).toBe(true);
    });

    it('can set memorial date', () => {
      // Arrange
      const pet = Pet.create(
        id,
        new StringValueObject(faker.animal.cat()),
        Math.random() > 0.5 ? Gender.Male : Gender.Female,
        new StringValueObject(faker.string.alphanumeric(9)),
        new BooleanValueObject(faker.datatype.boolean()),
        new DateValueObject(faker.date.past()),
        userId,
      );
      const memorialDate = new DateValueObject(faker.date.recent());

      // Act
      pet.die(memorialDate);

      // Assert
      expect(pet.getMemorialDate()).toBe(memorialDate);
    });
  });
});
