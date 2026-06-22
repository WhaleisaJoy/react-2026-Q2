import { screen } from '@testing-library/react';
import { NotFoundPage } from './not-found-page';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const renderNotFoundPage = () => {
  renderWithIntl(<NotFoundPage />);
};

describe('NotFoundPage', () => {
  it('should render page content', () => {
    renderNotFoundPage();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });
});
