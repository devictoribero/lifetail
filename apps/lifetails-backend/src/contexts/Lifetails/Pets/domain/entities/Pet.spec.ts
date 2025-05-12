import { Pet } from './Pet';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from './PetSpecies';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

describe('Pet', () => {
  it('should create a Pet instance', () => {
    // Arrange
    const id = new UUID(faker.string.uuid());
    const species = Species.Cat;
    const name = new StringValueObject(faker.animal.cat());
    const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const anniversaryDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());
    const ownerId = new UUID(faker.string.uuid());

    // Act
    const pet = new Pet(id, species, name, gender, sterilized, anniversaryDate, createdAt, ownerId);

    // Assert
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId()).toBe(id);
    expect(pet.getName()).toBe(name);
    expect(pet.getGender()).toBe(gender);
    expect(pet.isSterilized()).toBe(sterilized);
    expect(pet.getAnniversaryDate()).toBe(anniversaryDate);
    expect(pet.getCreatedAt()).toBe(createdAt);
    expect(pet.getOwnerId()).toBe(ownerId);
    expect(pet.getChipId()).toBeNull();
  });

  it('should create a Pet instance from primitives', () => {
    // Arrange
    const id = faker.string.uuid();
    const species = Species.Cat.toString();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const sterilized = faker.datatype.boolean();
    const anniversaryDate = faker.date.past();
    const createdAt = faker.date.recent();
    const ownerId = faker.string.uuid();

    // Act
    const pet = Pet.fromPrimitives(
      id,
      species,
      name,
      gender,
      sterilized,
      anniversaryDate,
      createdAt,
      ownerId,
    );

    // Assert
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId().toString()).toBe(id);
    expect(pet.getName().toString()).toBe(name);
    expect(pet.getGender().toString()).toBe(gender);
    expect(pet.isSterilized().getValue()).toBe(sterilized);
    expect(pet.getAnniversaryDate().toDate()).toEqual(anniversaryDate);
    expect(pet.getCreatedAt().toDate()).toEqual(createdAt);
  });

  it('should convert Pet instance to primitives', () => {
    // Arrange
    const id = new UUID(faker.string.uuid());
    const species = Species.Cat;
    const name = new StringValueObject(faker.animal.cat());
    const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const anniversaryDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());
    const ownerId = new UUID(faker.string.uuid());
    const pet = new Pet(id, species, name, gender, sterilized, anniversaryDate, createdAt, ownerId);

    // Act
    const primitives = pet.toPrimitives();

    // Assert
    expect(primitives).toEqual({
      id: id.toString(),
      species: species.toString(),
      name: name.toString(),
      gender: gender.toString(),
      sterilized: sterilized.getValue(),
      anniversaryDate: anniversaryDate.toISOString(),
      createdAt: createdAt.toISOString(),
      ownerId: ownerId.toString(),
      chipId: null,
    });
  });

  it('can be renamed', () => {
    // Arrange
    const id = new UUID(faker.string.uuid());
    const initialName = new StringValueObject(faker.animal.cat());
    const species = Species.Cat;
    const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const anniversaryDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());
    const ownerId = new UUID(faker.string.uuid());
    const pet = new Pet(
      id,
      species,
      initialName,
      gender,
      sterilized,
      anniversaryDate,
      createdAt,
      ownerId,
    );

    // Act
    pet.renameTo(new StringValueObject(faker.animal.cat()));

    // Assert
    expect(pet.getName().equals(initialName)).toBe(false);
  });

  it('can change gender', () => {
    // Arrange
    const pet = new Pet(
      new UUID(faker.string.uuid()),
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.Male,
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
      new DateValueObject(faker.date.recent()),
      new UUID(faker.string.uuid()),
    );

    // Act
    pet.changeGenderTo(Gender.Female);

    // Assert
    expect(pet.getGender().equals(Gender.Female)).toBe(true);
  });

  it('can be sterilized', () => {
    // Arrange
    const pet = new Pet(
      new UUID(faker.string.uuid()),
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.Male,
      new BooleanValueObject(false),
      new DateValueObject(faker.date.past()),
      new DateValueObject(faker.date.recent()),
      new UUID(faker.string.uuid()),
    );

    // Act
    pet.sterilize();

    // Assert
    expect(pet.isSterilized().getValue()).toBe(true);
  });

  it('can change the chipId', () => {
    // Arrange
    const pet = new Pet(
      new UUID(faker.string.uuid()),
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.Male,
      new BooleanValueObject(false),
      new DateValueObject(faker.date.past()),
      new DateValueObject(faker.date.recent()),
      new UUID(faker.string.uuid()),
    );
    expect(pet.getChipId()).toBeNull();

    // Act
    const chipId = new StringValueObject(faker.string.alphanumeric(9));
    pet.changeChipIdTo(chipId);

    // Assert
    expect(pet.getChipId()).toBe(chipId);
  });
});
