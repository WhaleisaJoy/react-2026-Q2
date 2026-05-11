import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render button with children', () => {
    render(<Button>Search</Button>);

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('has button type by default', () => {
    render(<Button>Search</Button>);

    expect(screen.getByRole('button', { name: /search/i })).toHaveAttribute('type', 'button');
  });
});
