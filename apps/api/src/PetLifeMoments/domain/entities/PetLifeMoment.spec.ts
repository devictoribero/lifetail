import { PetLifeMoment, PetLifeMomentCategory, PetLifeMomentType } from './PetLifeMoment';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';
import { fail } from 'node:assert';

describe('PetLifeMoment Domain Entity', () => {
  const validId = 'valid-id';
  const validPetId = 'pet-id';
  const validCreatedBy = 'user-id';
  const validDate = new Date();
  const validDescription = 'A description';

  it('should throw InvalidPetLifeMomentTypeException with correct message for invalid event type', () => {
    // Arrange
    const invalidEventType = 'InvalidType';

    // Act & Assert
    try {
      PetLifeMoment.create(
        validId,
        invalidEventType,
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
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
      validId,
      eventType,
      validPetId,
      validCreatedBy,
      validDate,
      validDescription,
    );

    // Assert
    expect(petLifeMoment).toBeDefined();
    expect(petLifeMoment.getId()).toBe(validId);
    expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Anniversary);
    expect(petLifeMoment.getPetId()).toBe(validPetId);
    expect(petLifeMoment.getCreatedBy()).toBe(validCreatedBy);
    expect(petLifeMoment.getOccurredOn()).toBe(validDate);
    expect(petLifeMoment.getDescription()).toBe(validDescription);
    expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
  });

  describe('Category integrity', () => {
    it('should create Arrival event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Arrival',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Arrival);
    });

    it('should create Anniversary event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Anniversary',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Anniversary);
    });

    it('should create Achievement event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Achievement',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Achievement);
    });

    it('should create Move event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Move',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Move);
    });

    it('should create Gift event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Gift',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Gift);
    });

    it('should create Walk event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Walk',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Walk);
    });

    it('should create Exercise event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Exercise',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Exercise);
    });

    it('should create Play event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Play',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Play);
    });

    it('should create Training event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Training',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Training);
    });

    it('should create Socialization event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Socialization',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Socialization);
    });

    it('should create Excursion event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Excursion',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Excursion);
    });

    it('should create DietChange event with Diet category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'DietChange',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Diet);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.DietChange);
    });

    it('should create SpecialMeal event with Diet category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'SpecialMeal',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Diet);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.SpecialMeal);
    });

    it('should create Hydration event with Diet category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Hydration',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Diet);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Hydration);
    });

    it('should create GroomingVisit event with HygieneAndBeauty category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'GroomingVisit',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.HygieneAndBeauty);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.GroomingVisit);
    });

    it('should create NailCut event with HygieneAndBeauty category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'NailCut',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.HygieneAndBeauty);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.NailCut);
    });

    it('should create Bath event with HygieneAndBeauty category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Bath',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.HygieneAndBeauty);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Bath);
    });

    it('should create VeterinaryVisit event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'VeterinaryVisit',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.VeterinaryVisit);
    });

    it('should create Vaccination event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Vaccination',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Vaccination);
    });

    it('should create Medication event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Medication',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Medication);
    });

    it('should create Surgery event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Surgery',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Surgery);
    });

    it('should create Illness event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Illness',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Illness);
    });

    it('should create Discomfort event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Discomfort',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Discomfort);
    });

    it('should create Injury event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Injury',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Injury);
    });

    it('should create Goodbye event with Farewell category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Goodbye',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Farewell);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Goodbye);
    });

    it('should create Death event with Farewell category', () => {
      const petLifeMoment = PetLifeMoment.create(
        validId,
        'Death',
        validPetId,
        validCreatedBy,
        validDate,
        validDescription,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Farewell);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Death);
    });
  });
});
