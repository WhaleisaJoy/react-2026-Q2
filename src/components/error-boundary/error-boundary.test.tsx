import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import { ErrorBoundary } from './error-boundary';
import userEvent from '@testing-library/user-event';

let shouldThrowError = true;

class ComponentWithPossibleError extends Component {
  render() {
    if (shouldThrowError) {
      throw new Error('Test application error');
    }

    return <div>Component content</div>;
  }
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrowError = true;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render children when no error is thrown', () => {
    shouldThrowError = false;

    render(
      <ErrorBoundary>
        <ComponentWithPossibleError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/component content/i)).toBeInTheDocument();
  });

  it('should render fallback UI when error is thrown', () => {
    render(
      <ErrorBoundary>
        <ComponentWithPossibleError />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Something went wrong/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload app/i })).toBeInTheDocument();
  });

  it('should log error to console when error is thrown', () => {
    render(
      <ErrorBoundary>
        <ComponentWithPossibleError />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });

  it('should render children after clicking reload button if error is fixed', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ComponentWithPossibleError />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    shouldThrowError = false;

    await user.click(screen.getByRole('button', { name: /reload app/i }));

    expect(screen.getByText(/component content/i)).toBeInTheDocument();
  });
});
