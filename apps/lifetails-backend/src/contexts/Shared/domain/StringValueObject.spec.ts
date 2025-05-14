import { StringValueObject } from './StringValueObject';

describe('StringValueObject', () => {
  it('should create a value object from a string', () => {
    const stringValueObject = new StringValueObject('test');
    expect(stringValueObject).toBeDefined();
  });

  it('can convert the value of a string value object to a string', () => {
    const stringValueObject = new StringValueObject('test');
    expect(stringValueObject.toString()).toBe('test');
  });

  it('can determine when the value of two string value objects is the same', () => {
    const stringValueObject1 = new StringValueObject('test');
    const stringValueObject2 = new StringValueObject('test');
    expect(stringValueObject1.equals(stringValueObject2)).toBe(true);
  });

  it('can determine when the value of two string value objects is different', () => {
    const stringValueObject1 = new StringValueObject('test');
    const stringValueObject2 = new StringValueObject('test2');
    expect(stringValueObject1.equals(stringValueObject2)).toBe(false);
  });
});
