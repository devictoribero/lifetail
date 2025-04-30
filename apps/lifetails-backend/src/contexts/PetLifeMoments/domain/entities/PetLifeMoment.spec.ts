import { PetLifeMoment } from './PetLifeMoment';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';
import { fail } from 'node:assert';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentType } from './PetLifeMomentType';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('PetLifeMoment Domain Entity', () => {
  let id: string;
  let petId: string;
  let createdBy: string;
  let occurredOn: Date;
  let description: string;

  beforeEach(() => {
    id = randomUUID();
    petId = randomUUID();
    createdBy = randomUUID();
    occurredOn = faker.date.recent();
    description = faker.lorem.sentence();
  });

  it('should throw InvalidPetLifeMomentTypeException with correct message for invalid event type', () => {
    // Arrange
    const invalidEventType = 'InvalidType';

    // Act & Assert
    try {
      PetLifeMoment.create(
        id,
        PetLifeMomentType.create(invalidEventType),
        petId,
        createdBy,
        occurredOn,
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
    const eventType = 'Anniversary';

    // Act
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.create(eventType),
      petId,
      createdBy,
      occurredOn,
      new StringValueObject(description),
    );

    // Assert
    expect(petLifeMoment).toBeInstanceOf(PetLifeMoment);
  });

  describe('Category integrity', () => {
    it('should create a PetLifeMoment with Celebration theme when type="Arrival"', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.create('Arrival'),
        petId,
        createdBy,
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
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
        occurredOn,
        new StringValueObject(description),
      );

      expect(petLifeMoment.getTheme().toString()).toBe(PetLifeMomentTheme.Farewell.toString());
      expect(petLifeMoment.getType().toString()).toBe(PetLifeMomentType.Death.toString());
    });
  });
});
