import { Pet } from './Pet';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from './PetSpecies';

describe('Pet', () => {
  let id: string;
  let userId: string;

  beforeEach(() => {
    id = faker.string.uuid();
    userId = faker.string.uuid();
  });

  it('should create a Pet instance', () => {
    // Arrange
    const species = Species.Cat;
    const name = new StringValueObject(faker.animal.cat());
    const gender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const anniversaryDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());

    // Act
    const pet = new Pet(id, species, name, gender, sterilized, anniversaryDate, createdAt, userId);

    // Assert
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId()).toBe(id);
    expect(pet.getName()).toBe(name);
    expect(pet.getGender()).toBe(gender);
    expect(pet.isSterilized()).toBe(sterilized);
    expect(pet.getAnniversaryDate()).toBe(anniversaryDate);
    expect(pet.getCreatedAt()).toBe(createdAt);
    expect(pet.getUserId()).toBe(userId);
    expect(pet.getChipId()).toBeNull();
  });

  it('should create a Pet instance from primitives', () => {
    // Arrange
    const species = Species.Cat.toString();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const sterilized = faker.datatype.boolean();
    const anniversaryDate = faker.date.past();
    const createdAt = faker.date.recent();

    // Act
    const pet = Pet.fromPrimitives(
      id,
      species,
      name,
      gender,
      sterilized,
      anniversaryDate,
      createdAt,
      userId,
    );

    // Assert
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId()).toBe(id);
    expect(pet.getName().toString()).toBe(name);
    expect(pet.getGender().toString()).toBe(gender);
    expect(pet.isSterilized().getValue()).toBe(sterilized);
    expect(pet.getAnniversaryDate().toDate()).toEqual(anniversaryDate);
    expect(pet.getCreatedAt().toDate()).toEqual(createdAt);
  });

  it('should convert Pet instance to primitives', () => {
    // Arrange
    const species = Species.Cat.toString();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const sterilized = faker.datatype.boolean();
    const anniversaryDate = faker.date.past();
    const createdAt = faker.date.recent();
    const pet = Pet.fromPrimitives(
      id,
      species,
      name,
      gender,
      sterilized,
      anniversaryDate,
      createdAt,
      userId,
    );

    // Act
    const primitives = pet.toPrimitives();

    // Assert
    expect(primitives).toEqual({
      id,
      species,
      name,
      gender,
      sterilized,
      anniversaryDate: anniversaryDate.toISOString(),
      createdAt: createdAt.toISOString(),
      userId,
      chipId: null,
    });
  });

  it('can be renamed', () => {
    // Arrange
    const initialName = new StringValueObject(faker.animal.cat());
    const species = Species.Cat;
    const pet = Pet.create(
      id,
      species,
      initialName,
      Math.random() > 0.5 ? Gender.Male : Gender.Female,
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
    const species = Species.Cat;
    const initialGender = Math.random() > 0.5 ? Gender.Male : Gender.Female;
    const newGender = initialGender === Gender.Male ? Gender.Female : Gender.Male;

    const pet = Pet.create(
      id,
      species,
      new StringValueObject(faker.animal.cat()),
      initialGender,
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
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Math.random() > 0.5 ? Gender.Male : Gender.Female,
      new BooleanValueObject(false),
      new DateValueObject(faker.date.past()),
      userId,
    );

    // Act
    pet.sterilize();

    // Assert
    expect(pet.isSterilized().getValue()).toBe(true);
  });

  it('can change the chipId', () => {
    // Arrange
    const pet = Pet.create(
      id,
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.Male,
      new BooleanValueObject(false),
      new DateValueObject(faker.date.past()),
      userId,
    );
    expect(pet.getChipId()).toBeNull();

    // Act
    const chipId = new StringValueObject(faker.string.alphanumeric(9));
    pet.changeChipIdTo(chipId);

    // Assert
    expect(pet.getChipId()).toBe(chipId);
  });
});
