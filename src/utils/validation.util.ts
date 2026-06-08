export function isValidEmail(email: string): boolean {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  if (!localPart || !domain) {
    return false;
  }

  const domainParts = domain.split('.');

  return domainParts.length >= 2 && domainParts.every(Boolean);
}
