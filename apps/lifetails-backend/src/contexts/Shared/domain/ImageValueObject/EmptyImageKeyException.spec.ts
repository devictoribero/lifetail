import { EmptyImageKeyException } from './EmptyImageKeyException';

describe('EmptyImageKeyException', () => {
  it('should be instance of EmptyImageKeyException', () => {
    const exception = new EmptyImageKeyException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.name).toBe('EmptyImageKeyException');
    expect(exception.code).toBe('EMPTY_IMAGE_KEY');
    expect(exception.message).toBe('Image key cannot be empty');
  });
});
