export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];
