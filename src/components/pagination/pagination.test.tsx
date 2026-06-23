import { screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { renderWithIntl } from '../../test-utils/render-with-intl';
import type { AnchorHTMLAttributes } from 'react';

vi.mock('../../i18n/navigation', () => ({
  Link: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Pagination', () => {
  it('should render current page and total pages', () => {
    renderWithIntl(<Pagination currentPage={2} totalPages={5} searchValue="" selectedCharacterId={null} />);

    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
  });

  it('should disable previous button on the first page', () => {
    renderWithIntl(<Pagination currentPage={1} totalPages={5} searchValue="" selectedCharacterId={null} />);

    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
    expect(screen.getByRole('link', { name: '>' })).toHaveAttribute('href', '?page=2');
  });

  it('should disable next button on the last page', () => {
    renderWithIntl(<Pagination currentPage={5} totalPages={5} searchValue="" selectedCharacterId={null} />);

    expect(screen.getByRole('link', { name: '<' })).toHaveAttribute('href', '?page=4');
    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });

  it('should render previous page link', () => {
    renderWithIntl(<Pagination currentPage={3} totalPages={5} searchValue="" selectedCharacterId={null} />);

    expect(screen.getByRole('link', { name: '<' })).toHaveAttribute('href', '?page=2');
  });

  it('should render next page link with search and details params', () => {
    renderWithIntl(<Pagination currentPage={3} totalPages={5} searchValue="rick" selectedCharacterId={1} />);

    expect(screen.getByRole('link', { name: '>' })).toHaveAttribute('href', '?search=rick&page=4&details=1');
  });
});
