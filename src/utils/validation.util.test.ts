import { isValidEmail } from './validation.util';

describe('isValidEmail', () => {
  it('returns true for valid email', () => {
    expect(isValidEmail('john@example.com')).toBe(true);
  });

  it('returns false when @ is missing', () => {
    expect(isValidEmail('johnexample.com')).toBe(false);
  });

  it('returns false when local part is empty', () => {
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('returns false when domain has no dot', () => {
    expect(isValidEmail('john@example')).toBe(false);
  });

  it('returns false when email contains multiple @', () => {
    expect(isValidEmail('john@@example.com')).toBe(false);
  });
});
