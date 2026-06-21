'use client';

import './header.scss';
import { APP_ROUTES } from '../../constants/routes';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="app-header">
      <Link href={APP_ROUTES.MAIN} className="app-header__logo">
        RickVerse Search
      </Link>

      <div className="app-header__spacer">
        <nav className="app-header__nav" aria-label="Main Navigation">
          <Link
            href={APP_ROUTES.MAIN}
            className={`app-header__nav-link ${pathname === APP_ROUTES.MAIN ? 'app-header__nav-link--active' : ''}`}
          >
            Main
          </Link>
          <Link
            href={APP_ROUTES.ABOUT}
            className={`app-header__nav-link ${pathname === APP_ROUTES.ABOUT ? 'app-header__nav-link--active' : ''}`}
          >
            About
          </Link>
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
