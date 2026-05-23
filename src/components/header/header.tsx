import { Link, NavLink } from 'react-router';
import './header.scss';
import { APP_ROUTES } from '../../router/routes';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

export function Header() {
  return (
    <header className="app-header">
      <Link to={APP_ROUTES.MAIN.to} className="app-header__logo">
        RickVerse Search
      </Link>

      <div className="app-header__spacer">
        <nav className="app-header__nav" aria-label="Main Navigation">
          <NavLink
            to={APP_ROUTES.MAIN.to}
            className={({ isActive }) => `app-header__nav-link ${isActive ? 'app-header__nav-link--active' : ''}`}
          >
            Main
          </NavLink>
          <NavLink
            to={APP_ROUTES.ABOUT.to}
            className={({ isActive }) => `app-header__nav-link ${isActive ? 'app-header__nav-link--active' : ''}`}
          >
            About
          </NavLink>
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
