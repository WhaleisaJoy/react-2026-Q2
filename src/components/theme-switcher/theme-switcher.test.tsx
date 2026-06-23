import { screen } from '@testing-library/react';
import { ThemeSwitcher } from './theme-switcher';
import { ThemeProvider } from '../../context/theme-provider';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const renderThemeSwitcher = () => {
  renderWithIntl(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

describe('ThemeSwitcher', () => {
  it('should render theme switcher button', () => {
    renderThemeSwitcher();

    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();

    renderThemeSwitcher();

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
