import { screen } from '@testing-library/react';
import { Header } from './header';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '../../constants/routes';
import { ThemeProvider } from '../../context/theme-provider';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const replaceMock = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('../../i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

const renderHeader = (path = '/') => {
  vi.mocked(usePathname).mockReturnValue(path);

  renderWithIntl(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};

describe('Header', () => {
  it('should rener header landmark', () => {
    renderHeader();

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /rickverse search/i })).toHaveAttribute('href', APP_ROUTES.MAIN);
    expect(screen.getByRole('link', { name: /main/i })).toHaveAttribute('href', APP_ROUTES.MAIN);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', APP_ROUTES.ABOUT);
  });

  it('should mark main link as active on main page', () => {
    renderHeader('/');

    expect(screen.getByRole('link', { name: /main/i })).toHaveClass('app-header__nav-link--active');
    expect(screen.getByRole('link', { name: /about/i })).not.toHaveClass('app-header__nav-link--active');
  });

  it('should mark about link as active on about page', () => {
    renderHeader('/about');

    expect(screen.getByRole('link', { name: /about/i })).toHaveClass('app-header__nav-link--active');
    expect(screen.getByRole('link', { name: /main/i })).not.toHaveClass('app-header__nav-link--active');
  });
});
