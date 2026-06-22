import './pagination.scss';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { buildSearchUrl } from '../../utils/url-params.utils';
import { Button } from '../shared/button/button';

interface Props {
  currentPage: number;
  totalPages: number;
  searchValue: string;
  selectedCharacterId: number | null;
}

export function Pagination({ currentPage, totalPages, searchValue, selectedCharacterId }: Props) {
  const t = useTranslations('pagination');

  return (
    <nav className="pagination" aria-label={t('label')}>
      {currentPage === 1 ? (
        <Button disabled>&lt;</Button>
      ) : (
        <Link
          className="button pagination__link"
          href={buildSearchUrl({
            searchValue,
            page: currentPage - 1,
            details: selectedCharacterId,
          })}
        >
          &lt;
        </Link>
      )}

      <span>
        {t('pageInfo', {
          currentPage,
          totalPages,
        })}
      </span>

      {currentPage === totalPages ? (
        <Button disabled>&gt;</Button>
      ) : (
        <Link
          className="button pagination__link"
          href={buildSearchUrl({
            searchValue,
            page: currentPage + 1,
            details: selectedCharacterId,
          })}
        >
          &gt;
        </Link>
      )}
    </nav>
  );
}
