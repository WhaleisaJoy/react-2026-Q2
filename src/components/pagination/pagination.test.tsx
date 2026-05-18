import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  it('should render current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
  });

  it('should disable previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '>' })).toBeEnabled();
  });

  it('should disable next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: '<' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });

  it('should call onPageChange with previous page when previous button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();

    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    await user.click(screen.getByRole('button', { name: '<' }));

    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with next page when next button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();

    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    await user.click(screen.getByRole('button', { name: '>' }));

    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });
});
