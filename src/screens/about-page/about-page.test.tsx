import { screen } from '@testing-library/react';
import { AboutPage } from './about-page';
import { renderWithIntl } from '../../test-utils/render-with-intl';

describe('AboutPage', () => {
  it('should render about page content', () => {
    renderWithIntl(<AboutPage />);

    expect(screen.getByRole('heading', { name: /about the project/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /author/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mentor/i })).toBeInTheDocument();
  });
});
