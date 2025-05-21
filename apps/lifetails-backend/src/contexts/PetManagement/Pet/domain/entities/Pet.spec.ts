import { Pet } from './Pet';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from './PetSpecies';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetAddedDomainEvent } from '../PetAddedDomainEvent';
import { PetObjectMother } from './PetObjectMother.spec';

describe('Pet', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create a Pet instance', () => {
    const species = Species.DOG;
    const name = new StringValueObject(faker.person.firstName());
    const gender = Gender.MALE;
    const sterilized = new BooleanValueObject(faker.datatype.boolean());
    const birthDate = new DateValueObject(faker.date.past());
    const arrivalDate = new DateValueObject(faker.date.recent());
    const color = new StringValueObject(faker.color.human());

    const pet = PetObjectMother.create({
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      color,
    });

    expect(pet).toBeDefined();
    expect(pet.getId()).not.toBeNull();
    expect(pet.getSpecies().equals(Species.DOG)).toBe(true);
    expect(pet.getName().equals(name)).toBe(true);
    expect(pet.getGender().equals(Gender.MALE)).toBe(true);
    expect(pet.isSterilized().getValue()).toBe(sterilized.getValue());
    expect(pet.getBirthDate().equals(birthDate)).toBe(true);
    expect(pet.getArrivalDate().equals(arrivalDate)).toBe(true);
    expect(pet.getOwnerId()).not.toBeNull();
    expect(pet.getColor().equals(color)).toBe(true);
    expect(pet.getCreatedAt()).not.toBeNull();
    expect(pet.getUpdatedAt()).toBeNull();
    expect(pet.getDeletedAt()).toBeNull();
    expect(pet.getMicrochipNumber()).toBeNull();
    const events = pet.pullDomainEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(PetAddedDomainEvent);
  });

  it('can serialize to primitives a Pet instance', () => {
    const pet = PetObjectMother.create();

    const primitives = pet.toPrimitives();

    expect(primitives).toEqual({
      id: pet.getId().toString(),
      species: pet.getSpecies().toString(),
      name: pet.getName().toString(),
      gender: pet.getGender().toString(),
      sterilized: pet.isSterilized().getValue(),
      birthDate: pet.getBirthDate().toISOString(),
      arrivalDate: pet.getArrivalDate().toISOString(),
      microchipNumber: null,
      color: pet.getColor().toString(),
      ownerId: pet.getOwnerId()?.toString() ?? null,
      createdAt: expect.any(String),
      updatedAt: null,
      deletedAt: null,
    });
  });

  it('can be renamed', () => {
    const pet = PetObjectMother.create();
    const newName = new StringValueObject(faker.person.firstName());

    pet.renameTo(newName);

    expect(pet.getName().equals(newName)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change gender', () => {
    const pet = PetObjectMother.create();

    pet.changeGenderTo(Gender.FEMALE);

    expect(pet.getGender()).toBe(Gender.FEMALE);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can be sterilized', () => {
    const pet = PetObjectMother.create();

    pet.sterilize();

    expect(pet.isSterilized().getValue()).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can be unsterilized', () => {
    const pet = PetObjectMother.createWith({
      sterilized: new BooleanValueObject(true),
    });

    pet.unsterilize();

    expect(pet.isSterilized().getValue()).toBe(false);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change birth date', () => {
    const pet = PetObjectMother.create();
    const newBirthDate = new DateValueObject(faker.date.past());

    pet.changeBirthdateTo(newBirthDate);

    expect(pet.getBirthDate().equals(newBirthDate)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change arrival date', () => {
    const pet = PetObjectMother.create();
    const newArrivalDate = new DateValueObject(faker.date.recent());

    pet.changeArrivalDateTo(newArrivalDate);

    expect(pet.getArrivalDate().equals(newArrivalDate)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change microchip number', () => {
    const pet = PetObjectMother.create();
    const newMicrochipNumber = new StringValueObject(faker.string.alphanumeric(15));

    pet.changeMicrochipNumberTo(newMicrochipNumber);

    expect(pet.getMicrochipNumber()?.equals(newMicrochipNumber)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can change color', () => {
    const pet = PetObjectMother.create();
    const newColor = new StringValueObject(faker.color.human());

    pet.changeColorTo(newColor);

    expect(pet.getColor().equals(newColor)).toBe(true);
    expect(pet.getUpdatedAt()).not.toBeNull();
  });

  it('can be marked as deleted', () => {
    const pet = PetObjectMother.create();

    pet.markAsDeleted();

    expect(pet.getDeletedAt()).not.toBeNull();
    expect(pet.getUpdatedAt()).not.toBeNull();
  });
});
