import { Pet } from './Pet';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from './PetSpecies';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetAddedDomainEvent } from '../PetAddedDomainEvent';

describe('Pet', () => {
  it('should create a Pet instance', () => {
    // Given
    const id = new UUID(faker.string.uuid());
    const species = Species.CAT;
    const name = new StringValueObject(faker.animal.cat());
    const gender = Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const birthDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());
    const ownerId = new UUID(faker.string.uuid());
    const color = new StringValueObject('Orange Tabby');

    // When
    const pet = new Pet({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      createdAt,
      ownerId,
      color,
    });

    // Then
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId()).toBe(id);
    expect(pet.getName()).toBe(name);
    expect(pet.getGender()).toBe(gender);
    expect(pet.isSterilized()).toBe(sterilized);
    expect(pet.getBirthDate()).toBe(birthDate);
    expect(pet.getCreatedAt()).toBe(createdAt);
    expect(pet.getOwnerId()).toBe(ownerId);
    expect(pet.getMicrochipNumber()).toBeNull();
    expect(pet.getColor()).toBe(color);
    expect(pet.getUpdatedAt()).toBeNull();
    expect(pet.getDeletedAt()).toBeNull();
  });

  it('should record a PetCreatedDomainEvent when a Pet is created', () => {
    // Given
    const pet = Pet.create({
      id: new UUID(faker.string.uuid()),
      species: Species.CAT,
      name: new StringValueObject(faker.animal.cat()),
      gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
      sterilized: new BooleanValueObject(faker.datatype.boolean()),
      birthDate: new DateValueObject(faker.date.past()),
      arrivalDate: new DateValueObject(faker.date.past()),
      ownerId: new UUID(faker.string.uuid()),
      color: new StringValueObject(faker.color.human()),
    });

    // When
    const events = pet.pullDomainEvents();

    // Then
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(PetAddedDomainEvent);
    expect(events[0]).toEqual({
      eventName: 'pet.added',
      aggregateId: pet.getId().toString(),
      eventId: events[0].eventId,
      occurredOn: events[0].occurredOn,
      name: pet.getName().toString(),
    });
  });

  it('should create a Pet instance from primitives', () => {
    // Given
    const id = faker.string.uuid();
    const species = Species.CAT.toString();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'MALE' : 'FEMALE';
    const sterilized = faker.datatype.boolean();
    const birthDate = faker.date.past();
    const arrivalDate = faker.date.past();
    const createdAt = faker.date.recent();
    const ownerId = faker.string.uuid();
    const color = 'Black and White';
    // When
    const pet = Pet.fromPrimitives({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      ownerId,
      color,
    });

    // Then
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId().toString()).toBe(id);
    expect(pet.getName().toString()).toBe(name);
    expect(pet.getGender().toString()).toBe(gender);
    expect(pet.isSterilized().getValue()).toBe(sterilized);
    expect(pet.getBirthDate().toDate()).toEqual(birthDate);
    expect(pet.getArrivalDate().toDate()).toEqual(arrivalDate);
    expect(pet.getCreatedAt().toDate()).toEqual(createdAt);
    expect(pet.getColor().toString()).toBe(color);
  });

  it('should convert Pet instance to primitives', () => {
    // Given
    const id = new UUID(faker.string.uuid());
    const species = Species.CAT;
    const name = new StringValueObject(faker.animal.cat());
    const gender = Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const birthDate = new DateValueObject(faker.date.past());
    const arrivalDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());
    const ownerId = new UUID(faker.string.uuid());
    const color = new StringValueObject('Calico');
    const pet = new Pet({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      ownerId,
      color,
    });

    // When
    const primitives = pet.toPrimitives();

    // Then
    expect(primitives).toEqual({
      id: id.toString(),
      species: species.toString(),
      name: name.toString(),
      gender: gender.toString(),
      sterilized: sterilized.getValue(),
      birthDate: birthDate.toISOString(),
      arrivalDate: arrivalDate.toISOString(),
      createdAt: createdAt.toISOString(),
      ownerId: ownerId.toString(),
      microchipNumber: null,
      color: color.toString(),
      updatedAt: null,
      deletedAt: null,
    });
  });

  it('can be renamed and updates the updatedAt field', () => {
    // Given
    const id = new UUID(faker.string.uuid());
    const initialName = new StringValueObject(faker.animal.cat());
    const species = Species.CAT;
    const gender = Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const birthDate = new DateValueObject(faker.date.past());
    const arrivalDate = new DateValueObject(faker.date.past());
    const createdAt = new DateValueObject(faker.date.recent());
    const ownerId = new UUID(faker.string.uuid());
    const color = new StringValueObject('Brown');
    const pet = new Pet({
      id,
      species,
      name: initialName,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      ownerId,
      color,
    });
    expect(pet.getUpdatedAt()).toBeNull();

    // When
    pet.renameTo(new StringValueObject(faker.animal.cat()));

    // Then
    expect(pet.getName().equals(initialName)).toBe(false);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change gender and updates the updatedAt field', () => {
    // Given
    const pet = new Pet({
      id: new UUID(faker.string.uuid()),
      species: Species.CAT,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.MALE,
      sterilized: new BooleanValueObject(faker.datatype.boolean()),
      birthDate: new DateValueObject(faker.date.past()),
      arrivalDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.recent()),
      ownerId: new UUID(faker.string.uuid()),
      color: new StringValueObject('Gray'),
    });
    expect(pet.getUpdatedAt()).toBeNull();

    // When
    pet.changeGenderTo(Gender.FEMALE);

    // Then
    expect(pet.getGender().equals(Gender.FEMALE)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can be sterilized and updates the updatedAt field', () => {
    // Given
    const pet = new Pet({
      id: new UUID(faker.string.uuid()),
      species: Species.CAT,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.MALE,
      sterilized: new BooleanValueObject(false),
      birthDate: new DateValueObject(faker.date.past()),
      arrivalDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.recent()),
      ownerId: new UUID(faker.string.uuid()),
      color: new StringValueObject('White'),
    });
    expect(pet.getUpdatedAt()).toBeNull();

    // When
    pet.sterilize();

    // Then
    expect(pet.isSterilized().getValue()).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change the microchipNumber and updates the updatedAt field', () => {
    // Given
    const pet = new Pet({
      id: new UUID(faker.string.uuid()),
      species: Species.CAT,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.MALE,
      sterilized: new BooleanValueObject(false),
      birthDate: new DateValueObject(faker.date.past()),
      arrivalDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.recent()),
      ownerId: new UUID(faker.string.uuid()),
      color: new StringValueObject('Tabby'),
    });
    expect(pet.getMicrochipNumber()).toBeNull();
    expect(pet.getUpdatedAt()).toBeNull();

    // When
    const microchipNumber = new StringValueObject(faker.string.alphanumeric(9));
    pet.changeMicrochipNumberTo(microchipNumber);

    // Then
    expect(pet.getMicrochipNumber().equals(microchipNumber)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change the color and updates the updatedAt field', () => {
    // Given
    const initialColor = new StringValueObject('Black');
    const pet = new Pet({
      id: new UUID(faker.string.uuid()),
      species: Species.CAT,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.MALE,
      sterilized: new BooleanValueObject(false),
      birthDate: new DateValueObject(faker.date.past()),
      arrivalDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.recent()),
      ownerId: new UUID(faker.string.uuid()),
      color: initialColor,
      updatedAt: null,
      deletedAt: null,
    });
    expect(pet.getUpdatedAt()).toBeNull();

    // When
    const newColor = new StringValueObject('White and Brown');
    pet.changeColorTo(newColor);

    // Then
    expect(pet.getColor().equals(newColor)).toBe(true);
    expect(pet.getColor().equals(initialColor)).toBe(false);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can be marked as deleted and updates both deletedAt and updatedAt fields', () => {
    // Given
    const pet = new Pet({
      id: new UUID(faker.string.uuid()),
      species: Species.CAT,
      name: new StringValueObject(faker.animal.cat()),
      gender: Gender.MALE,
      sterilized: new BooleanValueObject(false),
      birthDate: new DateValueObject(faker.date.past()),
      arrivalDate: new DateValueObject(faker.date.past()),
      createdAt: new DateValueObject(faker.date.recent()),
      ownerId: new UUID(faker.string.uuid()),
      color: new StringValueObject('Orange'),
    });
    expect(pet.getDeletedAt()).toBeNull();
    expect(pet.getUpdatedAt()).toBeNull();

    // When
    pet.markAsDeleted();

    // Then
    expect(pet.getDeletedAt()).not.toBeNull();
    expect(pet.getUpdatedAt()).not.toBeNull();
  });
});
