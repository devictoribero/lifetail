import { faker } from '@faker-js/faker';
import { Pet } from './Pet';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { Species } from './PetSpecies';
import { PetAddedDomainEvent } from '../PetAddedDomainEvent';

export class PetObjectMother {
  static create({
    name = new StringValueObject(faker.person.firstName()),
    species = Species.DOG,
    gender = Gender.MALE,
    sterilized = new BooleanValueObject(faker.datatype.boolean()),
    birthDate = new DateValueObject(faker.date.past()),
    arrivalDate = new DateValueObject(faker.date.recent()),
    color = new StringValueObject(faker.color.human()),
  }: {
    name?: StringValueObject;
    species?: Species;
    gender?: Gender;
    sterilized?: BooleanValueObject;
    birthDate?: DateValueObject;
    arrivalDate?: DateValueObject;
    color?: StringValueObject;
  } = {}): Pet {
    const id = UUID.generate();
    const ownerId = UUID.generate();

    return Pet.create({
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
  }

  static createWith({
    id = UUID.generate(),
    species = Species.DOG,
    name = new StringValueObject(faker.person.firstName()),
    gender = Gender.MALE,
    sterilized = new BooleanValueObject(faker.datatype.boolean()),
    birthDate = new DateValueObject(faker.date.past()),
    arrivalDate = new DateValueObject(faker.date.recent()),
    createdAt = new DateValueObject(new Date()),
    ownerId = null,
    microchipNumber = null,
    color = new StringValueObject(faker.color.human()),
    updatedAt = null,
    deletedAt = null,
  }: {
    id?: UUID;
    species?: Species;
    name?: StringValueObject;
    gender?: Gender;
    sterilized?: BooleanValueObject;
    birthDate?: DateValueObject;
    arrivalDate?: DateValueObject;
    createdAt?: DateValueObject;
    ownerId?: UUID | null;
    microchipNumber?: StringValueObject | null;
    color?: StringValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  } = {}): Pet {
    return new Pet({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      ownerId,
      microchipNumber,
      color,
      updatedAt,
      deletedAt,
    });
  }

  static fromPrimitives(params: {
    id: string;
    species: string;
    name: string;
    gender: string;
    sterilized: boolean;
    birthDate: Date;
    arrivalDate: Date;
    createdAt: Date;
    ownerId: string;
    microchipNumber?: string | null;
    color: string;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }): Pet {
    return Pet.fromPrimitives(params);
  }
}

describe('PetObjectMother', () => {
  it('should create a pet with default values', () => {
    const name = new StringValueObject('testPet');
    const color = new StringValueObject('brown');

    const pet = PetObjectMother.create({ name, color });

    expect(pet.getId()).not.toBeNull();
    expect(pet.getSpecies()).toBe(Species.DOG);
    expect(pet.getName().equals(name)).toBe(true);
    expect(pet.getGender()).toBe(Gender.MALE);
    expect(pet.isSterilized().getValue()).toBeDefined();
    expect(pet.getBirthDate()).not.toBeNull();
    expect(pet.getArrivalDate()).not.toBeNull();
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

  it('should create a pet with custom values', () => {
    const id = UUID.generate();
    const species = Species.CAT;
    const name = new StringValueObject('customPet');
    const gender = Gender.FEMALE;
    const sterilized = new BooleanValueObject(true);
    const birthDate = new DateValueObject(new Date());
    const arrivalDate = new DateValueObject(new Date());
    const createdAt = new DateValueObject(new Date());
    const color = new StringValueObject('black');

    const pet = PetObjectMother.createWith({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      color,
    });

    expect(pet.getId().equals(id)).toBe(true);
    expect(pet.getSpecies()).toBe(species);
    expect(pet.getName().equals(name)).toBe(true);
    expect(pet.getGender()).toBe(gender);
    expect(pet.isSterilized().equals(sterilized)).toBe(true);
    expect(pet.getBirthDate().equals(birthDate)).toBe(true);
    expect(pet.getArrivalDate().equals(arrivalDate)).toBe(true);
    expect(pet.getCreatedAt().equals(createdAt)).toBe(true);
    expect(pet.getColor().equals(color)).toBe(true);
    expect(pet.getUpdatedAt()).toBeNull();
    expect(pet.getDeletedAt()).toBeNull();
    expect(pet.getMicrochipNumber()).toBeNull();
  });

  it('should create a pet from primitives', () => {
    const id = faker.string.uuid();
    const species = Species.DOG.toString();
    const name = faker.person.firstName();
    const gender = Gender.MALE.toString();
    const sterilized = true;
    const birthDate = faker.date.past();
    const arrivalDate = faker.date.recent();
    const createdAt = faker.date.recent();
    const ownerId = faker.string.uuid();
    const microchipNumber = faker.string.alphanumeric(15);
    const color = faker.color.human();
    const updatedAt = faker.date.recent();
    const deletedAt = faker.date.recent();

    const pet = PetObjectMother.fromPrimitives({
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      ownerId,
      microchipNumber,
      color,
      updatedAt,
      deletedAt,
    });

    expect(pet.getId().equals(new UUID(id))).toBe(true);
    expect(pet.getSpecies().toString()).toBe(species);
    expect(pet.getName().equals(new StringValueObject(name))).toBe(true);
    expect(pet.getGender().toString()).toBe(gender);
    expect(pet.isSterilized().getValue()).toBe(sterilized);
    expect(pet.getBirthDate().equals(new DateValueObject(birthDate))).toBe(true);
    expect(pet.getArrivalDate().equals(new DateValueObject(arrivalDate))).toBe(true);
    expect(pet.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
    expect(pet.getOwnerId()?.equals(new UUID(ownerId))).toBe(true);
    expect(pet.getMicrochipNumber()?.equals(new StringValueObject(microchipNumber))).toBe(true);
    expect(pet.getColor().equals(new StringValueObject(color))).toBe(true);
    expect(pet.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBe(true);
    expect(pet.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBe(true);
  });
});
