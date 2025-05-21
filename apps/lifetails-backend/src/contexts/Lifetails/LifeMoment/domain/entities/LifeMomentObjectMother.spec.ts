import { LifeMoment } from './LifeMoment';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentType } from './LifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { LifeMomentTheme } from './LifeMomentTheme';

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

export class LifeMomentTypeObjectMother {
  static create(type?: string): LifeMomentType {
    return new LifeMomentType(type ?? getRandomMomentType());
  }
}

export class LifeMomentObjectMother {
  static create(params?: {
    id?: UUID;
    type?: LifeMomentType;
    petId?: UUID;
    createdBy?: UUID;
    occurredOn?: DateValueObject;
    description?: StringValueObject;
    createdAt?: DateValueObject;
    updatedAt?: DateValueObject;
    deletedAt?: DateValueObject;
  }): LifeMoment {
    const id = params?.id ?? new UUID(faker.string.uuid());
    const type = params?.type ?? new LifeMomentType(getRandomMomentType());
    const theme = type.getTheme();
    const petId = params?.petId ?? new UUID(faker.string.uuid());
    const createdBy = params?.createdBy ?? new UUID(faker.string.uuid());
    const occurredOn = params?.occurredOn ?? new DateValueObject(faker.date.recent());
    const description = params?.description ?? new StringValueObject(faker.lorem.sentence());
    const createdAt = params?.createdAt ?? new DateValueObject(faker.date.recent());
    const updatedAt = params?.updatedAt ?? null;
    const deletedAt = params?.deletedAt ?? null;

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
      deletedAt,
    });
  }

  static createWith(params: {
    id?: UUID;
    type?: LifeMomentType;
    petId?: UUID;
    createdBy?: UUID;
    occurredOn?: DateValueObject;
    description?: StringValueObject;
    createdAt?: DateValueObject;
    updatedAt?: DateValueObject;
    deletedAt?: DateValueObject;
  }): LifeMoment {
    return this.create(params);
  }

  static fromPrimitives(params: {
    id: string;
    type: string;
    theme: string;
    petId: string;
    createdBy: string;
    occurredOn: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }): LifeMoment {
    return LifeMoment.fromPrimitives(params);
  }
}

describe('LifeMomentObjectMother', () => {
  it('should create a LifeMoment with default values', () => {
    const lifeMoment = LifeMomentObjectMother.create();

    expect(lifeMoment).toBeInstanceOf(LifeMoment);
    expect(lifeMoment.getId()).toBeInstanceOf(UUID);
    expect(lifeMoment.getType()).toBeInstanceOf(LifeMomentType);
    expect(lifeMoment.getTheme()).toBeInstanceOf(LifeMomentTheme);
    expect(lifeMoment.getPetId()).toBeInstanceOf(UUID);
    expect(lifeMoment.getCreatedBy()).toBeInstanceOf(UUID);
    expect(lifeMoment.getOccurredOn()).toBeInstanceOf(DateValueObject);
    expect(lifeMoment.getDescription()).toBeInstanceOf(StringValueObject);
    expect(lifeMoment.getCreatedAt()).toBeInstanceOf(DateValueObject);
    expect(lifeMoment.getUpdatedAt()).toBeNull();
    expect(lifeMoment.getDeletedAt()).toBeNull();
  });

  it('should create a LifeMoment with custom values', () => {
    const id = new UUID(faker.string.uuid());
    const type = new LifeMomentType('Arrival');
    const petId = new UUID(faker.string.uuid());
    const createdBy = new UUID(faker.string.uuid());
    const occurredOn = new DateValueObject(faker.date.recent());
    const description = new StringValueObject(faker.lorem.sentence());

    const lifeMoment = LifeMomentObjectMother.create({
      id,
      type,
      petId,
      createdBy,
      occurredOn,
      description,
    });

    expect(lifeMoment.getId().equals(id)).toBe(true);
    expect(lifeMoment.getType().equals(type)).toBe(true);
    expect(lifeMoment.getPetId().equals(petId)).toBe(true);
    expect(lifeMoment.getCreatedBy().equals(createdBy)).toBe(true);
    expect(lifeMoment.getOccurredOn().equals(occurredOn)).toBe(true);
    expect(lifeMoment.getDescription().equals(description)).toBe(true);
  });

  it('should create a LifeMoment from primitive values', () => {
    const id = faker.string.uuid();
    const type = 'Arrival';
    const theme = 'Celebration';
    const petId = faker.string.uuid();
    const createdBy = faker.string.uuid();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();
    const createdAt = faker.date.recent();
    const updatedAt = faker.date.recent();
    const deletedAt = faker.date.recent();

    const lifeMoment = LifeMomentObjectMother.fromPrimitives({
      id,
      type,
      theme,
      petId,
      createdBy,
      occurredOn,
      description,
      createdAt,
      updatedAt,
      deletedAt,
    });

    expect(lifeMoment).toBeInstanceOf(LifeMoment);
    expect(lifeMoment.getId().toString()).toBe(id);
    expect(lifeMoment.getType().toString()).toBe(type);
    expect(lifeMoment.getTheme().toString()).toBe(theme);
    expect(lifeMoment.getPetId().toString()).toBe(petId);
    expect(lifeMoment.getCreatedBy().toString()).toBe(createdBy);
    expect(lifeMoment.getOccurredOn().equals(new DateValueObject(occurredOn))).toBe(true);
    expect(lifeMoment.getDescription().toString()).toBe(description);
    expect(lifeMoment.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
    expect(lifeMoment.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBe(true);
    expect(lifeMoment.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBe(true);
  });
});
