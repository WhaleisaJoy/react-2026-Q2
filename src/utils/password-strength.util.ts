export type PasswordChecks = {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialChar: boolean;
};

export function getPasswordChecks(password: string): PasswordChecks {
  return {
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordStrength(password: string): number {
  const checks = getPasswordChecks(password);
  return Object.values(checks).filter(Boolean).length;
}
