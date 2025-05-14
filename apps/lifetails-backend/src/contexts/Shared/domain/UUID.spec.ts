import { faker } from '@faker-js/faker';
import { UUID } from './UUID';

describe('UUID', () => {
  it('should throw an error if the UUID is not valid', () => {
    const uuid = 'invalid-uuid';
    expect(() => new UUID(uuid)).toThrow('The value <invalid-uuid> is not a valid UUID');
  });

  it('should create a valid but random UUID', () => {
    const uuid = UUID.create();
    expect(uuid).toBeDefined();
  });

  it('should create a value object from a string UUID', () => {
    const uuid = faker.string.uuid();
    const uuidValueObject = new UUID(uuid);
    expect(uuidValueObject.toString()).toBe(uuid);
  });
});
