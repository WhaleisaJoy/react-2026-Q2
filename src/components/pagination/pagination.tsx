import './pagination.scss';
import { Button } from '../shared/button/button';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <Button onClick={handlePreviousClick} disabled={currentPage === 1}>
        &lt;
      </Button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Button onClick={handleNextClick} disabled={currentPage === totalPages}>
        &gt;
      </Button>
    </nav>
  );
}
