import { describe, it, expect } from 'vitest';
import { getPasswordChecks, getPasswordStrength } from './password-strength.util';

describe('getPasswordChecks', () => {
  it('returns all false for empty string', () => {
    expect(getPasswordChecks('')).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecialChar: false,
    });
  });

  it('detects number', () => {
    expect(getPasswordChecks('abc1')).toMatchObject({
      hasNumber: true,
    });
  });

  it('detects uppercase', () => {
    expect(getPasswordChecks('abcA')).toMatchObject({
      hasUppercase: true,
    });
  });

  it('detects lowercase', () => {
    expect(getPasswordChecks('ABCa')).toMatchObject({
      hasLowercase: true,
    });
  });

  it('detects special character', () => {
    expect(getPasswordChecks('abc!')).toMatchObject({
      hasSpecialChar: true,
    });
  });

  it('detects all rules correctly', () => {
    expect(getPasswordChecks('Abc1!')).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecialChar: true,
    });
  });
});

describe('getPasswordStrength', () => {
  it('returns 0 for empty string', () => {
    expect(getPasswordStrength('')).toBe(0);
  });

  it('returns 1 when only one rule matches', () => {
    expect(getPasswordStrength('a')).toBe(1); // lowercase
    expect(getPasswordStrength('1')).toBe(1); // number
    expect(getPasswordStrength('A')).toBe(1); // uppercase
    expect(getPasswordStrength('!')).toBe(1); // special char
  });

  it('returns 2 for two rules', () => {
    expect(getPasswordStrength('a1')).toBe(2);
  });

  it('returns 3 for three rules', () => {
    expect(getPasswordStrength('aA1')).toBe(3);
  });

  it('returns 4 for strong password', () => {
    expect(getPasswordStrength('aA1!')).toBe(4);
  });
});
