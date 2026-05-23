import './theme-switcher.scss';
import { THEMES } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../shared/button/button';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <Button
      className={`theme-switcher ${theme === THEMES.DARK ? 'theme-switcher--dark' : 'theme-switcher--light'}`}
      aria-label="Toggle Theme"
      onClick={handleThemeToggle}
    >
      <span>{theme === THEMES.DARK ? '☀' : '☾'}</span>
    </Button>
  );
}
