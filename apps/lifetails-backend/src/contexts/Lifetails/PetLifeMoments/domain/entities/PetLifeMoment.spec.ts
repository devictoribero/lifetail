import { PetLifeMoment } from './PetLifeMoment';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';
import { fail } from 'node:assert';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentType } from './PetLifeMomentType';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';

describe('PetLifeMoment Domain Entity', () => {
  let id: string;
  let petId: string;
  let createdBy: string;
  let occurredOn: Date;
  let description: string;

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

  beforeEach(() => {
    id = randomUUID();
    petId = randomUUID();
    createdBy = randomUUID();
    occurredOn = faker.date.recent();
    description = faker.lorem.sentence();
  });

  it('should throw InvalidPetLifeMomentTypeException with correct message for invalid event type', () => {
    // Arrange
    const invalidEventType = faker.word.sample() + faker.string.alphanumeric(5);

    // Act & Assert
    try {
      PetLifeMoment.create(
        id,
        PetLifeMomentType.create(invalidEventType),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );
      fail('Should have thrown InvalidPetLifeMomentTypeException');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPetLifeMomentTypeException);
      expect(error.message).toBe(`Unknown pet life moment type: ${invalidEventType}`);
    }
  });

  it('should create a valid PetLifeMoment', () => {
    // Arrange
    const momentType = getRandomMomentType();

    // Act
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.create(momentType),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );

    // Assert
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(petLifeMoment.getCreatedAt()).toBeDefined();
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should have theme="default" when not provided', () => {
    // Arrange
    const momentType = getRandomMomentType();

    // Act
    const before = new Date();
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.create(momentType),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );
    const after = new Date();

    // Assert
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(petLifeMoment.getCreatedAt().toDate().getTime()).toBeGreaterThanOrEqual(
      before.getTime(),
    );
    expect(petLifeMoment.getCreatedAt().toDate().getTime()).toBeLessThanOrEqual(after.getTime());
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should have theme="from"', () => {
    // Arrange
    const momentType = getRandomMomentType();
    const theme = PetLifeMomentType.create(momentType).getTheme().toString();
    const occurredOn = faker.date.past();
    const description = faker.lorem.sentence();
    const createdAt = faker.date.recent();
    const updatedAt = null;

    // Act
    const petLifeMoment = PetLifeMoment.fromPrimitives(
      id,
      momentType,
      theme,
      petId,
      createdBy,
      occurredOn,
      description,
      createdAt,
      updatedAt,
    );

    // Assert
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(petLifeMoment.getId()).toBe(id);
    expect(petLifeMoment.getType().toString()).toBe(momentType);
    expect(petLifeMoment.getPetId().toString()).toBe(petId);
    expect(petLifeMoment.getCreatedBy().toString()).toBe(createdBy);
    expect(petLifeMoment.getOccurredOn().toDate().toISOString()).toBe(occurredOn.toISOString());
    expect(petLifeMoment.getDescription().toString()).toBe(description);
    expect(petLifeMoment.getCreatedAt().toDate()).toEqual(createdAt);
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should have theme="from" with default timestamps', () => {
    // Arrange
    const momentType = getRandomMomentType();
    const theme = PetLifeMomentType.create(momentType).getTheme().toString();
    const occurredOn = faker.date.past();
    const description = faker.lorem.sentence();

    // Act
    const before = new Date();
    const petLifeMoment = PetLifeMoment.fromPrimitives(
      id,
      momentType,
      theme,
      petId,
      createdBy,
      occurredOn,
      description,
    );
    const after = new Date();

    // Assert
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(petLifeMoment.getCreatedAt().toDate().getTime()).toBeGreaterThanOrEqual(
      before.getTime(),
    );
    expect(petLifeMoment.getCreatedAt().toDate().getTime()).toBeLessThanOrEqual(after.getTime());
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should convert PetLifeMoment to primitives', () => {
    // Arrange
    const momentType = getRandomMomentType();
    const theme = PetLifeMomentType.create(momentType).getTheme().toString();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();
    const createdAt = new DateValueObject(faker.date.recent());
    const updatedAt = null;
    const type = PetLifeMomentType.create(momentType);

    // Act
    const petLifeMoment = new PetLifeMoment(
      id,
      type,
      type.getTheme(),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
      createdAt,
      updatedAt,
    );

    // Assert
    expect(petLifeMoment.toPrimitives()).toEqual({
      id,
      type: momentType,
      theme,
      petId,
      createdBy,
      occurredOn,
      description,
      createdAt: createdAt.toDate(),
      updatedAt: null,
    });
  });

  describe('Mutation methods', () => {
    it('should update updatedAt timestamp when updating description', () => {
      // Arrange
      const momentType = getRandomMomentType();
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create(momentType),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );
      expect(petLifeMoment.getUpdatedAt()).toBeNull();

      // Act
      const newDescription = faker.lorem.paragraph();
      petLifeMoment.updateDescription(new StringValueObject(newDescription));

      // Assert
      expect(petLifeMoment.getUpdatedAt()).not.toBeNull();
      expect(petLifeMoment.getUpdatedAt() instanceof DateValueObject).toBe(true);
      expect(petLifeMoment.getDescription().toString()).toBe(newDescription);
    });

    it('should update updatedAt timestamp when rescheduling', () => {
      // Arrange
      const momentType = getRandomMomentType();
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create(momentType),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );
      expect(petLifeMoment.getUpdatedAt()).toBeNull();

      // Act
      const newDate = faker.date.future();
      petLifeMoment.reschedule(new DateValueObject(newDate));

      // Assert
      expect(petLifeMoment.getUpdatedAt()).not.toBeNull();
      expect(petLifeMoment.getUpdatedAt() instanceof DateValueObject).toBe(true);
      expect(petLifeMoment.getOccurredOn().toDate().toISOString()).toBe(newDate.toISOString());
    });

    it('should update updatedAt timestamp when reassigning to another pet', () => {
      // Arrange
      const momentType = getRandomMomentType();
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create(momentType),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );
      expect(petLifeMoment.getUpdatedAt()).toBeNull();

      // Act
      const newPetId = randomUUID();
      petLifeMoment.reassignToCat(newPetId);

      // Assert
      expect(petLifeMoment.getUpdatedAt()).not.toBeNull();
      expect(petLifeMoment.getUpdatedAt() instanceof DateValueObject).toBe(true);
      expect(petLifeMoment.getPetId().toString()).toBe(newPetId);
    });
  });

  describe('Themes integrity', () => {
    it('should have theme="Celebration" when type="Arrival"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Arrival'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Celebration');
      expect(petLifeMoment.getType().toString()).toBe('Arrival');
    });

    it('should have theme="Celebration" when type="Anniversary"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Anniversary'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Celebration');
      expect(petLifeMoment.getType().toString()).toBe('Anniversary');
    });

    it('should have theme="Celebration" when type="Achievement"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Achievement'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Celebration');
      expect(petLifeMoment.getType().toString()).toBe('Achievement');
    });

    it('should have theme="Celebration" when type="Move"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Move'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Celebration');
      expect(petLifeMoment.getType().toString()).toBe('Move');
    });

    it('should have theme="Celebration" when type="Gift"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Gift'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Celebration');
      expect(petLifeMoment.getType().toString()).toBe('Gift');
    });

    it('should have theme="Activity" when type="Walk"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Walk'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Activity');
      expect(petLifeMoment.getType().toString()).toBe('Walk');
    });

    it('should have theme="Activity" when type="Exercise"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Exercise'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Activity');
      expect(petLifeMoment.getType().toString()).toBe('Exercise');
    });

    it('should have theme="Activity" when type="Play"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Play'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Activity');
      expect(petLifeMoment.getType().toString()).toBe('Play');
    });

    it('should have theme="Activity" when type="Training"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Training'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Activity');
      expect(petLifeMoment.getType().toString()).toBe('Training');
    });

    it('should have theme="Activity" when type="Socialization"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Socialization'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Activity');
      expect(petLifeMoment.getType().toString()).toBe('Socialization');
    });

    it('should have theme="Activity" when type="Excursion"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Excursion'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Activity');
      expect(petLifeMoment.getType().toString()).toBe('Excursion');
    });

    it('should have theme="DeliciousMoments" when type="DietChange"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('DietChange'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('DeliciousMoments');
      expect(petLifeMoment.getType().toString()).toBe('DietChange');
    });

    it('should have theme="DeliciousMoments" when type="SpecialMeal"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('SpecialMeal'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('DeliciousMoments');
      expect(petLifeMoment.getType().toString()).toBe('SpecialMeal');
    });

    it('should have theme="DeliciousMoments" when type="Hydration"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Hydration'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('DeliciousMoments');
      expect(petLifeMoment.getType().toString()).toBe('Hydration');
    });

    it('should have theme="GroomingAndCare" when type="GroomingVisit"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('GroomingVisit'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('GroomingAndCare');
      expect(petLifeMoment.getType().toString()).toBe('GroomingVisit');
    });

    it('should have theme="GroomingAndCare" when type="NailCut"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('NailCut'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('GroomingAndCare');
      expect(petLifeMoment.getType().toString()).toBe('NailCut');
    });

    it('should have theme="GroomingAndCare" when type="Bath"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Bath'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('GroomingAndCare');
      expect(petLifeMoment.getType().toString()).toBe('Bath');
    });

    it('should have theme="Wellness" when type="VeterinaryVisit"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('VeterinaryVisit'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('VeterinaryVisit');
    });

    it('should have theme="Wellness" when type="Vaccination"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Vaccination'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('Vaccination');
    });

    it('should have theme="Wellness" when type="Medication"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Medication'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('Medication');
    });

    it('should have theme="Wellness" when type="Surgery"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Surgery'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('Surgery');
    });

    it('should have theme="Wellness" when type="Illness"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Illness'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('Illness');
    });

    it('should have theme="Wellness" when type="Discomfort"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Discomfort'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('Discomfort');
    });

    it('should have theme="Wellness" when type="Injury"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Injury'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Wellness');
      expect(petLifeMoment.getType().toString()).toBe('Injury');
    });

    it('should have theme="Farewell" when type="Goodbye"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Goodbye'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Farewell');
      expect(petLifeMoment.getType().toString()).toBe('Goodbye');
    });

    it('should have theme="Farewell" when type="Death"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Death'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe('Farewell');
      expect(petLifeMoment.getType().toString()).toBe('Death');
    });
  });
});
