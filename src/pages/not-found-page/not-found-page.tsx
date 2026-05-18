import { APP_ROUTES } from '../../router/routes';
import './not-found-page.scss';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1 className="not-found-page__title">Page Not Found</h1>
      <p className="not-found-page__text">The page you are looking for doesn&apos;t exist or has been moved</p>

      <div className="not-found-page__actions">
        <Link to={APP_ROUTES.MAIN.to} className="not-found-page__link not-found-page__link--primary">
          Go to Main
        </Link>
        <Link to={APP_ROUTES.ABOUT.to} className="not-found-page__link">
          About Project
        </Link>
      </div>
    </div>
  );
}
