import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './not-found-page';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

const renderNotFoundPage = () => {
  vi.mocked(usePathname);

  render(<NotFoundPage />);
};

describe('NotFoundPage', () => {
  it('should render page content', () => {
    renderNotFoundPage();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });
});
