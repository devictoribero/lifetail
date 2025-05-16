import { LifeMoment } from './LifeMoment';
import { faker } from '@faker-js/faker';
import { LifeMomentType } from './LifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';

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

const createLifeMoment = () => {
  const id = new UUID(faker.string.uuid());
  const type = new LifeMomentType(getRandomMomentType());
  const theme = type.getTheme();
  const petId = new UUID(faker.string.uuid());
  const createdBy = new UUID(faker.string.uuid());
  const occurredOn = new DateValueObject(faker.date.recent());
  const description = new StringValueObject(faker.lorem.sentence());
  const createdAt = new DateValueObject(faker.date.recent());
  const updatedAt = new DateValueObject(faker.date.recent());

  return new LifeMoment({
    id,
    type,
    theme,
    petId,
    createdBy,
    occurredOn,
    description,
    createdAt,
    updatedAt,
  });
};

describe('LifeMoment Domain Entity', () => {
  it('should create a life moment', () => {
    const lifeMoment = createLifeMoment();
    expect(lifeMoment).toBeDefined();
    expect(lifeMoment).toBeInstanceOf(LifeMoment);
  });

  it('should create a Pet instance from primitives', () => {
    const lifeMoment = createLifeMoment();
    const primitives = lifeMoment.toPrimitives();
    const type = new LifeMomentType(primitives.type);
    const reconstructedLifeMoment = new LifeMoment({
      id: new UUID(primitives.id),
      type,
      theme: type.getTheme(),
      petId: new UUID(primitives.petId),
      createdBy: new UUID(primitives.createdBy),
      occurredOn: new DateValueObject(primitives.occurredOn),
      description: new StringValueObject(primitives.description),
      createdAt: new DateValueObject(primitives.createdAt),
      updatedAt: primitives.updatedAt ? new DateValueObject(primitives.updatedAt) : null,
    });
    expect(reconstructedLifeMoment).toBeDefined();
    expect(reconstructedLifeMoment).toBeInstanceOf(LifeMoment);
  });

  it('can be created with a named constructor', () => {
    const id = new UUID(faker.string.uuid());
    const type = new LifeMomentType(getRandomMomentType());
    const theme = type.getTheme();
    const petId = new UUID(faker.string.uuid());
    const createdBy = new UUID(faker.string.uuid());
    const occurredOn = new DateValueObject(faker.date.recent());
    const description = new StringValueObject(faker.lorem.sentence());

    const lifeMoment = LifeMoment.create({
      id,
      type,
      petId,
      createdBy,
      occurredOn,
      description,
    });

    expect(lifeMoment).toBeDefined();
    expect(lifeMoment).toBeInstanceOf(LifeMoment);
    expect(lifeMoment.getId()).toBe(id);
    expect(lifeMoment.getType()).toBe(type);
    expect(lifeMoment.getTheme()).toBe(theme);
    expect(lifeMoment.getPetId()).toBe(petId);
    expect(lifeMoment.getCreatedBy()).toBe(createdBy);
    expect(lifeMoment.getOccurredOn()).toBe(occurredOn);
    expect(lifeMoment.getDescription()).toBe(description);
  });

  it('can be reconstructed from primitives', () => {
    const lifeMoment = createLifeMoment();
    const primitives = lifeMoment.toPrimitives();

    const reconstructedLifeMoment = LifeMoment.fromPrimitives({
      id: primitives.id,
      type: primitives.type,
      theme: primitives.theme,
      petId: primitives.petId,
      createdBy: primitives.createdBy,
      occurredOn: primitives.occurredOn,
      description: primitives.description,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    });

    expect(reconstructedLifeMoment).toBeDefined();
    expect(reconstructedLifeMoment).toBeInstanceOf(LifeMoment);
    expect(reconstructedLifeMoment.getId()).toEqual(lifeMoment.getId());
    expect(reconstructedLifeMoment.getType()).toEqual(lifeMoment.getType());
    expect(reconstructedLifeMoment.getTheme()).toEqual(lifeMoment.getTheme());
    expect(reconstructedLifeMoment.getPetId()).toEqual(lifeMoment.getPetId());
    expect(reconstructedLifeMoment.getCreatedBy()).toEqual(lifeMoment.getCreatedBy());
  });

  it('can update the description', () => {
    const lifeMoment = createLifeMoment();
    const newDescription = new StringValueObject(faker.lorem.sentence());

    lifeMoment.updateDescription(newDescription);

    expect(lifeMoment.getDescription()).toEqual(newDescription);
  });

  it('can reschedule the moment', () => {
    const lifeMoment = createLifeMoment();
    const newOccurredOn = new DateValueObject(faker.date.recent());

    lifeMoment.reschedule(newOccurredOn);

    expect(lifeMoment.getOccurredOn()).toEqual(newOccurredOn);
  });

  it('can be serialized to primitives', () => {
    const lifeMoment = createLifeMoment();

    const primitives = lifeMoment.toPrimitives();

    expect(primitives).toBeDefined();
    expect(primitives).toBeInstanceOf(Object);
    expect(primitives.id).toBe(lifeMoment.getId().toString());
    expect(primitives.type).toBe(lifeMoment.getType().toString());
    expect(primitives.theme).toBe(lifeMoment.getTheme().toString());
    expect(primitives.petId).toBe(lifeMoment.getPetId().toString());
    expect(primitives.createdBy).toBe(lifeMoment.getCreatedBy().toString());
    expect(primitives.occurredOn).toBe(lifeMoment.getOccurredOn().toISOString());
    expect(primitives.description).toBe(lifeMoment.getDescription().toString());
    expect(primitives.createdAt).toBe(lifeMoment.getCreatedAt().toISOString());
    expect(primitives.updatedAt).toBe(lifeMoment.getUpdatedAt()?.toISOString());
  });
});
