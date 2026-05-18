import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Header } from './header';
import { MemoryRouter } from 'react-router';
import { APP_ROUTES } from '../../router/routes';

const renderHeader = (path = '/') => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
};

describe('Header', () => {
  it('should rener header landmark', () => {
    renderHeader();

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /rickverse search/i })).toHaveAttribute('href', APP_ROUTES.MAIN.to);
    expect(screen.getByRole('link', { name: /main/i })).toHaveAttribute('href', APP_ROUTES.MAIN.to);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', APP_ROUTES.ABOUT.to);
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
