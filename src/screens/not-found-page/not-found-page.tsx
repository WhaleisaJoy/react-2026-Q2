import { useTranslations } from 'next-intl';
import { APP_ROUTES } from '../../constants/routes';
import './not-found-page.scss';
import { Link } from '../../i18n/navigation';

export function NotFoundPage() {
  const t = useTranslations('notFoundPage');

  return (
    <div className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1 className="not-found-page__title">{t('title')}</h1>
      <p className="not-found-page__text">{t('text')}</p>

      <div className="not-found-page__actions">
        <Link href={APP_ROUTES.MAIN} className="not-found-page__link not-found-page__link--primary">
          {t('mainLink')}
        </Link>
        <Link href={APP_ROUTES.ABOUT} className="not-found-page__link">
          {t('aboutLink')}
        </Link>
      </div>
    </div>
  );
}
