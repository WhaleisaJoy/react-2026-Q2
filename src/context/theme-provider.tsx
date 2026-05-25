import { useEffect, useState, type PropsWithChildren } from 'react';
import { ThemeContext } from './theme-context';
import { THEMES, type Theme } from '../constants/theme';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(THEMES.DARK);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
