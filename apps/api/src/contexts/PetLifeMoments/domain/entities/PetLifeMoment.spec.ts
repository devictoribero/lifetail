import { PetLifeMoment, PetLifeMomentCategory, PetLifeMomentType } from './PetLifeMoment';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';
import { fail } from 'node:assert';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

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
      PetLifeMoment.create(id, invalidEventType, petId, createdBy, occurredOn, description);
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
      eventType,
      petId,
      createdBy,
      occurredOn,
      description,
    );

    // Assert
    expect(petLifeMoment).toBeDefined();
    expect(petLifeMoment.getId()).toBe(id);
    expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Anniversary);
    expect(petLifeMoment.getPetId()).toBe(petId);
    expect(petLifeMoment.getCreatedBy()).toBe(createdBy);
    expect(petLifeMoment.getOccurredOn()).toBe(occurredOn);
    expect(petLifeMoment.getDescription()).toBe(description);
    expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
  });

  describe('Category integrity', () => {
    it('should create Arrival event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Arrival',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Arrival);
    });

    it('should create Anniversary event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Anniversary',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Anniversary);
    });

    it('should create Achievement event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Achievement',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Achievement);
    });

    it('should create Move event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Move',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Move);
    });

    it('should create Gift event with Celebration category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Gift',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Celebration);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Gift);
    });

    it('should create Walk event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Walk',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Walk);
    });

    it('should create Exercise event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Exercise',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Exercise);
    });

    it('should create Play event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Play',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Play);
    });

    it('should create Training event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Training',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Training);
    });

    it('should create Socialization event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Socialization',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Socialization);
    });

    it('should create Excursion event with Activity category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Excursion',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Activity);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Excursion);
    });

    it('should create DietChange event with Diet category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'DietChange',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Diet);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.DietChange);
    });

    it('should create SpecialMeal event with Diet category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'SpecialMeal',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Diet);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.SpecialMeal);
    });

    it('should create Hydration event with Diet category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Hydration',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Diet);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Hydration);
    });

    it('should create GroomingVisit event with HygieneAndBeauty category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'GroomingVisit',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.HygieneAndBeauty);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.GroomingVisit);
    });

    it('should create NailCut event with HygieneAndBeauty category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'NailCut',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.HygieneAndBeauty);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.NailCut);
    });

    it('should create Bath event with HygieneAndBeauty category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Bath',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.HygieneAndBeauty);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Bath);
    });

    it('should create VeterinaryVisit event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'VeterinaryVisit',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.VeterinaryVisit);
    });

    it('should create Vaccination event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Vaccination',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Vaccination);
    });

    it('should create Medication event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Medication',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Medication);
    });

    it('should create Surgery event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Surgery',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Surgery);
    });

    it('should create Illness event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Illness',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Illness);
    });

    it('should create Discomfort event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Discomfort',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Discomfort);
    });

    it('should create Injury event with Health category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Injury',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Health);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Injury);
    });

    it('should create Goodbye event with Farewell category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Goodbye',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Farewell);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Goodbye);
    });

    it('should create Death event with Farewell category', () => {
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Death',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      expect(petLifeMoment.getCategory()).toBe(PetLifeMomentCategory.Farewell);
      expect(petLifeMoment.getEventType()).toBe(PetLifeMomentType.Death);
    });
  });
});
