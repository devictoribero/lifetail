import { InvalidImageUploadDateException } from './InvalidImageUploadDateException';

describe('InvalidImageUploadDateException', () => {
  it('should be instance of InvalidImageUploadDateException', () => {
    const invalidDate = new Date('invalid-date');
    const exception = new InvalidImageUploadDateException(invalidDate);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.name).toBe('InvalidImageUploadDateException');
    expect(exception.code).toBe('INVALID_IMAGE_UPLOAD_DATE');
    expect(exception.message).toBe('Invalid image upload date: Invalid Date');
  });
});
