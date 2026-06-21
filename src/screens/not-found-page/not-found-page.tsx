import Link from 'next/link';
import { APP_ROUTES } from '../../constants/routes';
import './not-found-page.scss';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1 className="not-found-page__title">Page Not Found</h1>
      <p className="not-found-page__text">The page you are looking for doesn&apos;t exist or has been moved</p>

      <div className="not-found-page__actions">
        <Link href={APP_ROUTES.MAIN} className="not-found-page__link not-found-page__link--primary">
          Go to Main
        </Link>
        <Link href={APP_ROUTES.ABOUT} className="not-found-page__link">
          About Project
        </Link>
      </div>
    </div>
  );
}
