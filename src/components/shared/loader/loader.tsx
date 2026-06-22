import './loader.scss';
import { useTranslations } from 'next-intl';

export function Loader() {
  const t = useTranslations('loader');

  return <div className="loader" role="status" aria-label={t('label')}></div>;
}
