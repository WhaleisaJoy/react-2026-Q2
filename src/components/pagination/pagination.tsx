import './pagination.scss';
import { Button } from '../shared/button/button';
import { useTranslations } from 'next-intl';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const t = useTranslations('pagination');

  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav className="pagination" aria-label={t('label')}>
      <Button onClick={handlePreviousClick} disabled={currentPage === 1}>
        &lt;
      </Button>

      <span>
        {t('pageInfo', {
          currentPage,
          totalPages,
        })}
      </span>

      <Button onClick={handleNextClick} disabled={currentPage === totalPages}>
        &gt;
      </Button>
    </nav>
  );
}
