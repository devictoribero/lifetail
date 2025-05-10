import { PetLifeMoment } from './PetLifeMoment';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';
import { fail } from 'node:assert';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentType } from './PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';

// Array of all valid moment types for random selection
const validMomentTypes = [
  'Arrival',
  'Anniversary',
  'Achievement',
  'Move',
  'Gift',
  'Walk',
  'Exercise',
  'Play',
  'Training',
  'Socialization',
  'Excursion',
  'DietChange',
  'SpecialMeal',
  'Hydration',
  'GroomingVisit',
  'NailCut',
  'Bath',
  'VeterinaryVisit',
  'Vaccination',
  'Medication',
  'Surgery',
  'Illness',
  'Discomfort',
  'Injury',
  'Goodbye',
  'Death',
];

const getRandomMomentType = () => {
  return validMomentTypes[Math.floor(Math.random() * validMomentTypes.length)];
};

const createPetLifeMoment = () => {
  const id = new UUID(faker.string.uuid());
  const type = new PetLifeMomentType(getRandomMomentType());
  const theme = type.getTheme();
  const petId = new UUID(faker.string.uuid());
  const createdBy = new UUID(faker.string.uuid());
  const occurredOn = new DateValueObject(faker.date.recent());
  const description = new StringValueObject(faker.lorem.sentence());
  const createdAt = new DateValueObject(faker.date.recent());
  const updatedAt = new DateValueObject(faker.date.recent());

  return new PetLifeMoment(
    id,
    type,
    theme,
    petId,
    createdBy,
    occurredOn,
    description,
    createdAt,
    updatedAt,
  );
};

describe('PetLifeMoment Domain Entity', () => {
  it('should create a pet life moment', () => {
    const petLifeMoment = createPetLifeMoment();
    expect(petLifeMoment).toBeDefined();
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
  });

  it('can be created with a named constructor', () => {
    const id = new UUID(faker.string.uuid());
    const type = new PetLifeMomentType(getRandomMomentType());
    const theme = type.getTheme();
    const petId = new UUID(faker.string.uuid());
    const createdBy = new UUID(faker.string.uuid());
    const occurredOn = new DateValueObject(faker.date.recent());
    const description = new StringValueObject(faker.lorem.sentence());

    const petLifeMoment = PetLifeMoment.create(id, type, petId, createdBy, occurredOn, description);

    expect(petLifeMoment).toBeDefined();
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(petLifeMoment.getId()).toBe(id);
    expect(petLifeMoment.getType()).toBe(type);
    expect(petLifeMoment.getTheme()).toBe(theme);
    expect(petLifeMoment.getPetId()).toBe(petId);
    expect(petLifeMoment.getCreatedBy()).toBe(createdBy);
    expect(petLifeMoment.getOccurredOn()).toBe(occurredOn);
    expect(petLifeMoment.getDescription()).toBe(description);
  });

  it('can be reconstructed from primitives', () => {
    const petLifeMoment = createPetLifeMoment();
    const primitives = petLifeMoment.toPrimitives();

    const reconstructedPetLifeMoment = PetLifeMoment.fromPrimitives(
      primitives.id,
      primitives.type,
      primitives.theme,
      primitives.petId,
      primitives.createdBy,
      primitives.occurredOn,
      primitives.description,
      primitives.createdAt,
      primitives.updatedAt,
    );

    expect(reconstructedPetLifeMoment).toBeDefined();
    expect(reconstructedPetLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(reconstructedPetLifeMoment.getId()).toEqual(petLifeMoment.getId());
    expect(reconstructedPetLifeMoment.getType()).toEqual(petLifeMoment.getType());
    expect(reconstructedPetLifeMoment.getTheme()).toEqual(petLifeMoment.getTheme());
    expect(reconstructedPetLifeMoment.getPetId()).toEqual(petLifeMoment.getPetId());
    expect(reconstructedPetLifeMoment.getCreatedBy()).toEqual(petLifeMoment.getCreatedBy());
  });

  it('can update the description', () => {
    const petLifeMoment = createPetLifeMoment();
    const newDescription = new StringValueObject(faker.lorem.sentence());

    petLifeMoment.updateDescription(newDescription);

    expect(petLifeMoment.getDescription()).toEqual(newDescription);
  });

  it('can reschedule the moment', () => {
    const petLifeMoment = createPetLifeMoment();
    const newOccurredOn = new DateValueObject(faker.date.recent());

    petLifeMoment.reschedule(newOccurredOn);

    expect(petLifeMoment.getOccurredOn()).toEqual(newOccurredOn);
  });

  it('can be serialized to primitives', () => {
    const petLifeMoment = createPetLifeMoment();

    const primitives = petLifeMoment.toPrimitives();

    expect(primitives).toBeDefined();
    expect(primitives).toBeInstanceOf(Object);
    expect(primitives.id).toBe(petLifeMoment.getId().toString());
    expect(primitives.type).toBe(petLifeMoment.getType().toString());
    expect(primitives.theme).toBe(petLifeMoment.getTheme().toString());
    expect(primitives.petId).toBe(petLifeMoment.getPetId().toString());
    expect(primitives.createdBy).toBe(petLifeMoment.getCreatedBy().toString());
    expect(primitives.occurredOn).toBe(petLifeMoment.getOccurredOn().toISOString());
    expect(primitives.description).toBe(petLifeMoment.getDescription().toString());
    expect(primitives.createdAt).toBe(petLifeMoment.getCreatedAt().toISOString());
    expect(primitives.updatedAt).toBe(petLifeMoment.getUpdatedAt()?.toISOString());
  });
});
