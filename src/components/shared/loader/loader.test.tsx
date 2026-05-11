import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loader', () => {
  it('should render loader', () => {
    render(<Loader />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
