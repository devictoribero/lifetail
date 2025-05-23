import { InvalidDateException } from './InvalidDateException';

describe('InvalidDateException', () => {
  it('should be an instance of InvalidDateException', () => {
    const date = 'invalid-date';
    const error = new InvalidDateException(date);

    expect(error).toBeInstanceOf(InvalidDateException);
    expect(error.name).toBe('InvalidDateException');
    expect(error.code).toBe('INVALID_DATE');
    expect(error.message).toBe(`The date <${date}> is not valid.`);
  });
});
