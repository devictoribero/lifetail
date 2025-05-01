import { randomUUID } from 'crypto';
import { Pet } from './Pet';
import { PetGender } from './PetGender';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/modules/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('Pet', () => {
  describe('create', () => {
    it('should create a Pet instance', () => {
      // Arrange
      const id = randomUUID();
      const name = new StringValueObject('Fluffy');
      const gender = PetGender.Male;
      const chipId = new StringValueObject('123456789');
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthdate = new DateValueObject(new Date('2020-01-01'));

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
    });
  });

  describe('fromPrimitives', () => {
    it('should create a Pet instance from primitives', () => {
      // Arrange
      const id = randomUUID();
      const name = faker.animal.cat();
      const gender = 'Male';
      const chipId = '987654321';
      const sterilized = faker.datatype.boolean();
      const birthdate = new Date('2019-05-15');

      // Act
      const pet = Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthdate);

      // Assert
      expect(pet).toBeDefined();
      expect(pet.getId()).toBe(id);
      expect(pet.getName().toString()).toBe(name);
      expect(pet.getGender().toString()).toBe(gender);
      expect(pet.getChipId().toString()).toBe(chipId);
      expect(pet.isSterilized().getValue()).toBe(sterilized);
      expect(pet.getBirthdate().toDate()).toEqual(birthdate);
    });
  });

  describe('toPrimitives', () => {
    it('should convert Pet instance to primitives', () => {
      // Arrange
      const id = randomUUID();
      const name = faker.animal.cat();
      const gender = 'Female';
      const chipId = '555555555';
      const sterilized = faker.datatype.boolean();
      const birthdate = new Date('2018-10-20');

      const pet = Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthdate);

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
      });
    });
  });
});
