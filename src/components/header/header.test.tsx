import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('should rener header landmark', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render header with children', () => {
    render(<Header>Test Content</Header>);

    expect(screen.getByRole('banner')).toHaveTextContent('Test Content');
  });
});
