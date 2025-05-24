import { ImageValueObject } from './ImageValueObject';
import { StringValueObject } from '../StringValueObject';
import { DateValueObject } from '../DateValueObject';
import { EmptyImageKeyException } from './EmptyImageKeyException';
import { InvalidImageUploadDateException } from './InvalidImageUploadDateException';

describe('ImageValueObject', () => {
  const validKey = 'images/pets/profile_12345.jpg';
  const validUploadedAt = new Date('2023-12-01T10:30:00Z');

  describe('constructor', () => {
    it('should create a valid ImageValueObject', () => {
      const image = new ImageValueObject(validKey, validUploadedAt);

      expect(image.getKey().toString()).toBe(validKey);
      expect(image.getUploadedAt().toDate()).toEqual(validUploadedAt);
    });

    it('should trim whitespace from key', () => {
      const keyWithWhitespace = '  images/pets/profile_12345.jpg  ';
      const image = new ImageValueObject(keyWithWhitespace, validUploadedAt);

      expect(image.getKey().toString()).toBe(validKey);
    });

    it('should throw EmptyImageKeyException when key is empty', () => {
      expect(() => new ImageValueObject('', validUploadedAt)).toThrow(EmptyImageKeyException);
    });

    it('should throw EmptyImageKeyException when key is only whitespace', () => {
      expect(() => new ImageValueObject('   ', validUploadedAt)).toThrow(EmptyImageKeyException);
    });

    it('should throw InvalidImageUploadDateException when uploadedAt is invalid', () => {
      const invalidDate = new Date('invalid-date');
      expect(() => new ImageValueObject(validKey, invalidDate)).toThrow(
        InvalidImageUploadDateException,
      );
    });
  });

  describe('fromPrimitives', () => {
    it('should create ImageValueObject from primitives', () => {
      const image = ImageValueObject.fromPrimitives(validKey, validUploadedAt);

      expect(image.getKey().toString()).toBe(validKey);
      expect(image.getUploadedAt().toDate()).toEqual(validUploadedAt);
    });
  });

  describe('toPrimitives', () => {
    it('should return primitive values', () => {
      const image = new ImageValueObject(validKey, validUploadedAt);
      const primitives = image.toPrimitives();

      expect(primitives).toEqual({
        key: validKey,
        uploadedAt: validUploadedAt,
      });
    });
  });

  describe('equals', () => {
    it('should return true for images with same key and uploadedAt', () => {
      const image1 = new ImageValueObject(validKey, validUploadedAt);
      const image2 = new ImageValueObject(validKey, validUploadedAt);

      expect(image1.equals(image2)).toBe(true);
    });

    it('should return false for images with different keys', () => {
      const image1 = new ImageValueObject(validKey, validUploadedAt);
      const image2 = new ImageValueObject('different/key.jpg', validUploadedAt);

      expect(image1.equals(image2)).toBe(false);
    });

    it('should return false for images with different uploadedAt', () => {
      const image1 = new ImageValueObject(validKey, validUploadedAt);
      const image2 = new ImageValueObject(validKey, new Date('2023-12-02T10:30:00Z'));

      expect(image1.equals(image2)).toBe(false);
    });
  });

  describe('getters', () => {
    it('should return StringValueObject for key', () => {
      const image = new ImageValueObject(validKey, validUploadedAt);
      const key = image.getKey();

      expect(key).toBeInstanceOf(StringValueObject);
      expect(key.toString()).toBe(validKey);
    });

    it('should return DateValueObject for uploadedAt', () => {
      const image = new ImageValueObject(validKey, validUploadedAt);
      const uploadedAt = image.getUploadedAt();

      expect(uploadedAt).toBeInstanceOf(DateValueObject);
      expect(uploadedAt.toDate()).toEqual(validUploadedAt);
    });
  });
});
