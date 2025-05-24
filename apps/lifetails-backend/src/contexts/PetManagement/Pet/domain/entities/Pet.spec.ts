import { Pet } from './Pet';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { Species } from './PetSpecies';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetAddedDomainEvent } from '../PetAddedDomainEvent';
import { PetObjectMother } from './PetObjectMother.spec';
import { NumberValueObject } from 'src/contexts/Shared/domain/NumberValueObject';
import { ImageValueObject } from 'src/contexts/Shared/domain/ImageValueObject/ImageValueObject';

describe('Pet', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Creation', () => {
    it('should create a Pet instance and record a PetAddedDomainEvent', () => {
      const species = Species.DOG;
      const name = new StringValueObject(faker.person.firstName());
      const gender = Gender.MALE;
      const sterilized = new BooleanValueObject(faker.datatype.boolean());
      const birthDate = new DateValueObject(faker.date.past());
      const arrivalDate = new DateValueObject(faker.date.recent());
      const color = new StringValueObject(faker.color.human());

      const pet = PetObjectMother.create({
        species,
        name,
        gender,
        sterilized,
        birthDate,
        arrivalDate,
        color,
      });

      expect(pet).toBeDefined();
      expect(pet.getId()).not.toBeNull();
      expect(pet.getSpecies().equals(Species.DOG)).toBeTruthy();
      expect(pet.getName().equals(name)).toBeTruthy();
      expect(pet.getGender().equals(Gender.MALE)).toBeTruthy();
      expect(pet.isSterilized().getValue()).toBe(sterilized.getValue());
      expect(pet.getBirthDate().equals(birthDate)).toBeTruthy();
      expect(pet.getArrivalDate().equals(arrivalDate)).toBeTruthy();
      expect(pet.getOwnerId()).not.toBeNull();
      expect(pet.getColor().equals(color)).toBeTruthy();
      expect(pet.getCreatedAt()).not.toBeNull();
      expect(pet.getUpdatedAt()).toBeNull();
      expect(pet.getDeletedAt()).toBeNull();
      expect(pet.getMicrochipNumber()).toBeNull();
      const events = pet.pullDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0]).toBeInstanceOf(PetAddedDomainEvent);
    });

    it('should initially have no image', () => {
      const pet = PetObjectMother.create();

      expect(pet.getImage()).toBeNull();
    });
  });

  describe('Serialization', () => {
    it('should serialize to primitives a Pet instance', () => {
      const pet = PetObjectMother.createWith({
        birthDate: new DateValueObject(new Date('2020-03-20')),
      });

      const primitives = pet.toPrimitives();

      expect(primitives).toEqual({
        id: pet.getId().toString(),
        species: pet.getSpecies().toString(),
        name: pet.getName().toString(),
        gender: pet.getGender().toString(),
        sterilized: pet.isSterilized().getValue(),
        birthDate: pet.getBirthDate().toISOString(),
        arrivalDate: pet.getArrivalDate().toISOString(),
        microchipNumber: null,
        color: pet.getColor().toString(),
        image: null,
        ownerId: pet.getOwnerId()?.toString() ?? null,
        createdAt: expect.any(String),
        updatedAt: null,
        deletedAt: null,
        age: 5,
      });
    });

    it('should unserialize from primitives a Pet instance', () => {
      const id = faker.string.uuid();
      const species = Species.DOG.toString();
      const name = faker.person.firstName();
      const gender = Gender.MALE.toString();
      const sterilized = faker.datatype.boolean();
      const birthDate = faker.date.past();
      const arrivalDate = faker.date.recent();
      const color = faker.color.human();
      const ownerId = faker.string.uuid();
      const createdAt = faker.date.recent();
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
        color,
        ownerId,
        createdAt,
        updatedAt,
        deletedAt,
      });

      expect(pet).toBeInstanceOf(Pet);
      expect(pet.getId().toString()).toBe(id.toString());
      expect(pet.getSpecies().equals(Species.DOG)).toBeTruthy();
      expect(pet.getName().toString()).toBe(name);
      expect(pet.getGender().equals(Gender.MALE)).toBeTruthy();
      expect(pet.isSterilized().getValue()).toBe(sterilized);
      expect(pet.getBirthDate().equals(new DateValueObject(birthDate))).toBeTruthy();
      expect(pet.getArrivalDate().equals(new DateValueObject(arrivalDate))).toBeTruthy();
      expect(pet.getOwnerId()?.toString()).toBe(ownerId);
      expect(pet.getCreatedAt().equals(new DateValueObject(createdAt))).toBeTruthy();
      expect(pet.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBeTruthy();
      expect(pet.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBeTruthy();
    });

    it('should serialize to primitives a Pet instance with image', () => {
      const pet = PetObjectMother.create();
      const testImage = new ImageValueObject(
        'images/pets/test_pet.jpg',
        new Date('2023-12-01T10:30:00Z'),
      );

      pet.changeImageTo(testImage);
      const primitives = pet.toPrimitives();

      expect(primitives.image).toEqual({
        key: 'images/pets/test_pet.jpg',
        uploadedAt: new Date('2023-12-01T10:30:00Z'),
      });
    });
  });

  describe('Interaction', () => {
    it('can be renamed', () => {
      const pet = PetObjectMother.create();
      const newName = new StringValueObject(faker.person.firstName());

      pet.renameTo(newName);

      expect(pet.getName().equals(newName)).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can change gender', () => {
      const pet = PetObjectMother.create();

      pet.changeGenderTo(Gender.FEMALE);

      expect(pet.getGender()).toBe(Gender.FEMALE);
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can be sterilized', () => {
      const pet = PetObjectMother.create();

      pet.sterilize();

      expect(pet.isSterilized().getValue()).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can be unsterilized', () => {
      const pet = PetObjectMother.createWith({
        sterilized: new BooleanValueObject(true),
      });

      pet.unsterilize();

      expect(pet.isSterilized().getValue()).toBe(false);
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can change birth date', () => {
      const pet = PetObjectMother.create();
      const newBirthDate = new DateValueObject(faker.date.past());

      pet.changeBirthdateTo(newBirthDate);

      expect(pet.getBirthDate().equals(newBirthDate)).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can change arrival date', () => {
      const pet = PetObjectMother.create();
      const newArrivalDate = new DateValueObject(faker.date.recent());

      pet.changeArrivalDateTo(newArrivalDate);

      expect(pet.getArrivalDate().equals(newArrivalDate)).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can change microchip number', () => {
      const pet = PetObjectMother.create();
      const newMicrochipNumber = new StringValueObject(faker.string.alphanumeric(15));

      pet.changeMicrochipNumberTo(newMicrochipNumber);

      expect(pet.getMicrochipNumber()?.equals(newMicrochipNumber)).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can change color', () => {
      const pet = PetObjectMother.create();
      const newColor = new StringValueObject(faker.color.human());

      pet.changeColorTo(newColor);

      expect(pet.getColor().equals(newColor)).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can change image', () => {
      const pet = PetObjectMother.create();
      const newImage = new ImageValueObject(
        'images/pets/profile_12345.jpg',
        new Date('2023-12-01T10:30:00Z'),
      );

      pet.changeImageTo(newImage);

      expect(pet.getImage()?.equals(newImage)).toBeTruthy();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can remove image', () => {
      const pet = PetObjectMother.createWith({
        image: new ImageValueObject('images/pets/initial.jpg', new Date('2023-12-01T10:30:00Z')),
      });

      expect(pet.getImage()).not.toBeNull();
      pet.removeImage();

      expect(pet.getImage()).toBeNull();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    it('can be marked as deleted', () => {
      const pet = PetObjectMother.create();

      pet.markAsDeleted();

      expect(pet.getDeletedAt()).not.toBeNull();
      expect(pet.getUpdatedAt()).not.toBeNull();
    });

    describe('Age calculation', () => {
      it('should return age as a NumberValueObject', () => {
        const pet = PetObjectMother.create();
        const age = pet.getAge();

        expect(age).toBeInstanceOf(NumberValueObject);
      });

      it('should calculate age correctly when birthday has not occurred this year', () => {
        // Set fixed date to March 15, 2024
        jest.setSystemTime(new Date('2024-03-15'));

        // Create pet born on March 20, 2020
        const birthDate = new DateValueObject(new Date('2020-03-20'));
        const pet = PetObjectMother.createWith({ birthDate });

        const age = pet.getAge();

        expect(age.getValue()).toBe(3);
      });

      it('should calculate age correctly on birthday', () => {
        // Set fixed date to March 20, 2024
        jest.setSystemTime(new Date('2024-03-20'));

        // Create pet born on March 20, 2020
        const birthDate = new DateValueObject(new Date('2020-03-20'));
        const pet = PetObjectMother.createWith({ birthDate });

        const age = pet.getAge();

        expect(age.getValue()).toBe(4);
      });

      it('should calculate age correctly after birthday has occurred this year', () => {
        // Set fixed date to March 25, 2024
        jest.setSystemTime(new Date('2024-03-25'));

        // Create pet born on March 20, 2020
        const birthDate = new DateValueObject(new Date('2020-03-20'));
        const pet = PetObjectMother.createWith({ birthDate });

        const age = pet.getAge();

        expect(age.getValue()).toBe(4);
      });
    });
  });
});
