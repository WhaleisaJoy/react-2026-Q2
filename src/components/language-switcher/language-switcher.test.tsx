import { screen } from '@testing-library/react';
import { LanguageSwitcher } from './language-switcher';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const replaceMock = vi.hoisted(() => vi.fn());

vi.mock('../../i18n/navigation', () => ({
  usePathname: () => '/about',
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

const renderLanguageSwitcher = () => {
  renderWithIntl(<LanguageSwitcher />);
};

describe('LanguageSwitcher', () => {
  it('should render language switcher button', () => {
    renderLanguageSwitcher();

    expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
  });

  it('should change language on click', async () => {
    const user = userEvent.setup();

    renderLanguageSwitcher();

    await user.click(screen.getByRole('button', { name: /change language/i }));
    await user.click(screen.getByRole('option', { name: /russian/i }));

    expect(replaceMock).toHaveBeenCalledWith('/about', { locale: 'ru' });
  });
});
