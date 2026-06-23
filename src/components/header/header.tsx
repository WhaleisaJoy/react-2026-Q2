'use client';

import './header.scss';
import { APP_ROUTES } from '../../constants/routes';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';

export function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <header className="app-header">
      <Link href={APP_ROUTES.MAIN} className="app-header__logo">
        RickVerse Search
      </Link>

      <div className="app-header__spacer">
        <nav className="app-header__nav" aria-label={t('navigationLabel')}>
          <Link
            href={APP_ROUTES.MAIN}
            className={`app-header__nav-link ${pathname === APP_ROUTES.MAIN ? 'app-header__nav-link--active' : ''}`}
          >
            {t('main')}
          </Link>
          <Link
            href={APP_ROUTES.ABOUT}
            className={`app-header__nav-link ${pathname === APP_ROUTES.ABOUT ? 'app-header__nav-link--active' : ''}`}
          >
            {t('about')}
          </Link>
        </nav>

        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
