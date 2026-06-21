import { render, screen } from '@testing-library/react';
import { AboutPage } from './about-page';

describe('AboutPage', () => {
  it('should render about page content', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: /about the project/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /author/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mentor/i })).toBeInTheDocument();
  });
});
