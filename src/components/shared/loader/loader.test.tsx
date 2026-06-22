import { screen } from '@testing-library/react';
import { Loader } from './loader';
import { renderWithIntl } from '../../../test-utils/render-with-intl';

describe('Loader', () => {
  it('should render loader', () => {
    renderWithIntl(<Loader />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
