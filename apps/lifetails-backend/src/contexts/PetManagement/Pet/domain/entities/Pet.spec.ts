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
  it('can create a Pet instance and record a PetAddedDomainEvent', () => {
    // Given
    const id = new UUID(faker.string.uuid());
    const species = Species.CAT;
    const name = new StringValueObject(faker.animal.cat());
    const gender = Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const birthDate = new DateValueObject(faker.date.past());
    const arrivalDate = new DateValueObject(faker.date.past());
    const ownerId = new UUID(faker.string.uuid());
    const color = new StringValueObject('Orange Tabby');

    // When
    const pet = Pet.create({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      ownerId,
      color,
    });

    // Then
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.getId().equals(id)).toBe(true);
    expect(pet.getName().equals(name)).toBe(true);
    expect(pet.getGender().equals(gender)).toBe(true);
    expect(pet.isSterilized().equals(sterilized)).toBe(true);
    expect(pet.getBirthDate().equals(birthDate)).toBe(true);
    expect(pet.getArrivalDate().equals(arrivalDate)).toBe(true);
    expect(pet.getCreatedAt()).toBeInstanceOf(DateValueObject);
    expect(pet.getOwnerId().equals(ownerId)).toBe(true);
    expect(pet.getMicrochipNumber()).toBeNull();
    expect(pet.getColor().equals(color)).toBe(true);
    expect(pet.getUpdatedAt()).toBeNull();
    expect(pet.getDeletedAt()).toBeNull();
    const events = pet.pullDomainEvents();
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

  it('can create a Pet instance from primitives', () => {
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
    expect(pet.getId().equals(new UUID(id))).toBe(true);
    expect(pet.getName().equals(new StringValueObject(name))).toBe(true);
    expect(pet.getGender().equals(Gender.create(gender))).toBe(true);
    expect(pet.isSterilized().equals(new BooleanValueObject(sterilized))).toBe(true);
    expect(pet.getBirthDate().equals(new DateValueObject(birthDate))).toBe(true);
    expect(pet.getArrivalDate().equals(new DateValueObject(arrivalDate))).toBe(true);
    expect(pet.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
    expect(pet.getColor().equals(new StringValueObject(color))).toBe(true);
  });

  it('can serialize to primitives a Pet instance', () => {
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
      ownerId: ownerId.toString(),
      color: color.toString(),
      microchipNumber: null,
      createdAt: createdAt.toISOString(),
      updatedAt: null,
      deletedAt: null,
    });
  });

  it('can be renamed and get marked as updated', () => {
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
    const newName = new StringValueObject(faker.animal.cat());
    pet.renameTo(newName);

    // Then
    expect(pet.getName().equals(newName)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change gender and get marked as updated', () => {
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

  it('can be sterilized and get marked as updated', () => {
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

  it('can change the microchipNumber and get marked as updated', () => {
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

  it('can change the color and get marked as updated', () => {
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

  it('can be marked as deleted', () => {
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
    expect(pet.pullDomainEvents()).toEqual([]);
  });
});
