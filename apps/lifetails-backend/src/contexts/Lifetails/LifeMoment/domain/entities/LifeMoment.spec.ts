import { LifeMoment } from './LifeMoment';
import { faker } from '@faker-js/faker';
import { LifeMomentType } from './LifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentTheme } from './LifeMomentTheme';
import { LifeMomentObjectMother, LifeMomentTypeObjectMother } from './LifeMomentObjectMother.spec';

describe('LifeMoment Domain Entity', () => {
  describe('Creation', () => {
    it('can create a LifeMoment instance and no events should be recorded', () => {
      const id = new UUID(faker.string.uuid());
      const type = LifeMomentTypeObjectMother.create('Arrival');
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
      expect(lifeMoment.getTheme().equals(type.getTheme())).toBe(true);
      expect(lifeMoment.getPetId().equals(petId)).toBe(true);
      expect(lifeMoment.getCreatedBy().equals(createdBy)).toBe(true);
      expect(lifeMoment.getOccurredOn().equals(occurredOn)).toBe(true);
      expect(lifeMoment.getDescription().equals(description)).toBe(true);
      expect(lifeMoment.getCreatedAt()).not.toBeNull();
      expect(lifeMoment.getUpdatedAt()).toBeNull();
      expect(lifeMoment.getDeletedAt()).toBeNull();
    });
  });

  describe('Serialization', () => {
    it('should serialize to primitives a LifeMoment instance', () => {
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

      const primitives = lifeMoment.toPrimitives();
      expect(primitives).toEqual({
        id: id.toString(),
        type: type.toString(),
        theme: type.getTheme().toString(),
        petId: petId.toString(),
        createdBy: createdBy.toString(),
        occurredOn: occurredOn.toISOString(),
        description: description.toString(),
        createdAt: expect.any(String),
        updatedAt: null,
        deletedAt: null,
      });
    });

    it('should unserialize from primitives a LifeMoment instance', () => {
      const id = faker.string.uuid();
      const type = 'Arrival';
      const theme = 'Celebration';
      const petId = faker.string.uuid();
      const createdBy = faker.string.uuid();
      const occurredOn = faker.date.recent();
      const description = faker.lorem.sentence();
      const createdAt = faker.date.recent();
      const updatedAt = faker.date.recent();

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
        deletedAt: null,
      });

      expect(lifeMoment).toBeDefined();
      expect(lifeMoment.getId().equals(new UUID(id))).toBe(true);
      expect(lifeMoment.getType().equals(new LifeMomentType(type))).toBe(true);
      expect(lifeMoment.getTheme().equals(LifeMomentTheme.fromPrimitives(theme))).toBe(true);
      expect(lifeMoment.getPetId().equals(new UUID(petId))).toBe(true);
      expect(lifeMoment.getCreatedBy().equals(new UUID(createdBy))).toBe(true);
      expect(lifeMoment.getOccurredOn().equals(new DateValueObject(occurredOn))).toBe(true);
      expect(lifeMoment.getDescription().equals(new StringValueObject(description))).toBe(true);
      expect(lifeMoment.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
      expect(lifeMoment.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBe(true);
      expect(lifeMoment.getDeletedAt()).toBeNull();
    });
  });

  describe('Interaction', () => {
    it('can update the description', () => {
      const lifeMoment = LifeMomentObjectMother.create();
      const newDescription = new StringValueObject(faker.lorem.sentence());

      lifeMoment.updateDescription(newDescription);

      expect(lifeMoment.getDescription()).toEqual(newDescription);
    });

    it('can reschedule the moment', () => {
      const lifeMoment = LifeMomentObjectMother.create();
      const newOccurredOn = new DateValueObject(faker.date.recent());

      lifeMoment.reschedule(newOccurredOn);

      expect(lifeMoment.getOccurredOn()).toEqual(newOccurredOn);
    });

    it('can mark the moment as deleted', () => {
      const lifeMoment = LifeMomentObjectMother.create();

      lifeMoment.markAsDeleted();

      expect(lifeMoment.getDeletedAt()).not.toBeNull();
    });
  });
});
