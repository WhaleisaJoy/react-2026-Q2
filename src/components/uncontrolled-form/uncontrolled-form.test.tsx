import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncontrolledForm } from './uncontrolled-form';
import { vi } from 'vitest';

const mockDispatch = vi.fn();

vi.mock('../../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('../../utils/file-to-base64.utils', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64-image')),
}));

describe('UncontrolledForm', () => {
  it('renders form fields', () => {
    render(<UncontrolledForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows validation error when passwords do not match', async () => {
    render(<UncontrolledForm onSubmit={vi.fn()} />);

    const file = new File(['test'], 'avatar.png', {
      type: 'image/png',
    });

    await userEvent.type(screen.getByLabelText('Name'), 'John');

    await userEvent.type(screen.getByLabelText('Age'), '25');

    await userEvent.type(screen.getByLabelText('Email'), 'john@test.com');

    await userEvent.type(screen.getByLabelText('Password'), 'Password123');

    await userEvent.type(screen.getByLabelText('Confirm Password'), 'DifferentPassword');

    await userEvent.upload(screen.getByLabelText('Image'), file);

    await userEvent.type(screen.getByLabelText('Country'), 'Netherlands');

    await userEvent.click(screen.getByLabelText(/i accept terms & conditions/i));

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});
