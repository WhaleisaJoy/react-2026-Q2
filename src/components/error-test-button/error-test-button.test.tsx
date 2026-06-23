import { screen } from '@testing-library/react';
import { ErrorTestButton } from './error-test-button';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { renderWithIntl } from '../../test-utils/render-with-intl';

describe('ErrorTestButton', () => {
  it('should render button', () => {
    renderWithIntl(<ErrorTestButton />);

    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
  });

  it('should trigger error boundary fallback on click', async () => {
    const user = userEvent.setup();

    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithIntl(
      <ErrorBoundary>
        <ErrorTestButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /throw error/i }));

    expect(screen.getByRole('heading', { name: /Something went wrong/i })).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
