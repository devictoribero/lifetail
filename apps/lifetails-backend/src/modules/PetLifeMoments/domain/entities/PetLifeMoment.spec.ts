import { PetLifeMoment } from './PetLifeMoment';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';
import { fail } from 'node:assert';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentType } from './PetLifeMomentType';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';

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
    const createdAt = faker.date.recent();
    const updatedAt = null;

    // Act
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.create(momentType),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
      createdAt,
      updatedAt,
    );

    // Assert
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
    expect(petLifeMoment.getCreatedAt()).toEqual(createdAt);
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should create a PetLifeMoment with default timestamps when not provided', () => {
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
    expect(petLifeMoment.getCreatedAt().getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(petLifeMoment.getCreatedAt().getTime()).toBeLessThanOrEqual(after.getTime());
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should create a PetLifeMoment instance from primitives', () => {
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
    expect(petLifeMoment.getCreatedAt()).toEqual(createdAt);
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should create a PetLifeMoment instance from primitives with default timestamps', () => {
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
    expect(petLifeMoment.getCreatedAt().getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(petLifeMoment.getCreatedAt().getTime()).toBeLessThanOrEqual(after.getTime());
    expect(petLifeMoment.getUpdatedAt()).toBeNull();
  });

  it('should convert PetLifeMoment to primitives', () => {
    // Arrange
    const momentType = getRandomMomentType();
    const theme = PetLifeMomentType.create(momentType).getTheme().toString();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();
    const createdAt = faker.date.recent();
    const updatedAt = null;

    // Act
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.create(momentType),
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
      createdAt,
      updatedAt,
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
      expect(petLifeMoment.getUpdatedAt() instanceof Date).toBe(true);
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
      expect(petLifeMoment.getUpdatedAt() instanceof Date).toBe(true);
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
      expect(petLifeMoment.getUpdatedAt() instanceof Date).toBe(true);
      expect(petLifeMoment.getPetId().toString()).toBe(newPetId);
    });
  });

  describe('Category integrity', () => {
    it('should create a PetLifeMoment with Celebration theme when type="Arrival"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Arrival'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Celebration.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Arrival.toString());
    });

    it('should create a PetLifeMoment with Celebration theme when type="Anniversary"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Anniversary'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Celebration.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Anniversary.toString());
    });

    it('should create a PetLifeMoment with Celebration theme when type="Achievement"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Achievement'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Celebration.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Achievement.toString());
    });

    it('should create a PetLifeMoment with Celebration theme when type="Move"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Move'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Celebration.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Move.toString());
    });

    it('should create a PetLifeMoment with Celebration theme when type="Gift"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Gift'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Celebration.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Gift.toString());
    });

    it('should create a PetLifeMoment with Activity theme when type="Walk"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Walk'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Activity.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Walk.toString());
    });

    it('should create a PetLifeMoment with Activity theme when type="Exercise"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Exercise'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Activity.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Exercise.toString());
    });

    it('should create a PetLifeMoment with Activity theme when type="Play"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Play'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Activity.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Play.toString());
    });

    it('should create a PetLifeMoment with Activity theme when type="Training"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Training'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Activity.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Training.toString());
    });

    it('should create a PetLifeMoment with Activity theme when type="Socialization"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Socialization'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Activity.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Socialization.toString());
    });

    it('should create a PetLifeMoment with Activity theme when type="Excursion"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Excursion'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Activity.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Excursion.toString());
    });

    it('should create a PetLifeMoment with Diet theme when type="DietChange"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('DietChange'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Diet.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.DietChange.toString());
    });

    it('should create a PetLifeMoment with Diet theme when type="SpecialMeal"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('SpecialMeal'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Diet.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.SpecialMeal.toString());
    });

    it('should create a PetLifeMoment with Diet theme when type="Hydration"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Hydration'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Diet.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Hydration.toString());
    });

    it('should create a PetLifeMoment with HygieneAndBeauty theme when type="GroomingVisit"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('GroomingVisit'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(
        PetLifeMomentTheme.HygieneAndBeauty.toString(),
      );
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.GroomingVisit.toString());
    });

    it('should create a PetLifeMoment with HygieneAndBeauty theme when type="NailCut"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('NailCut'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(
        PetLifeMomentTheme.HygieneAndBeauty.toString(),
      );
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.NailCut.toString());
    });

    it('should create a PetLifeMoment with HygieneAndBeauty theme when type="Bath"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Bath'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(
        PetLifeMomentTheme.HygieneAndBeauty.toString(),
      );
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Bath.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="VeterinaryVisit"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('VeterinaryVisit'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.VeterinaryVisit.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="Vaccination"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Vaccination'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Vaccination.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="Medication"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Medication'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Medication.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="Surgery"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Surgery'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Surgery.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="Illness"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Illness'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Illness.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="Discomfort"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Discomfort'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Discomfort.toString());
    });

    it('should create a PetLifeMoment with Health theme when type="Injury"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Injury'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Health.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Injury.toString());
    });

    it('should create a PetLifeMoment with Farewell theme when type="Goodbye"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Goodbye'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Farewell.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Goodbye.toString());
    });

    it('should create a PetLifeMoment with Farewell theme when type="Death"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Death'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Farewell.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Death.toString());
    });
  });
});
