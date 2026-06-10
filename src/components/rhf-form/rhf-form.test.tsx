import { render, screen, waitFor } from '@testing-library/react';
import { RHFForm } from './rhf-form';
import userEvent from '@testing-library/user-event';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

vi.mock('../../utils/file-to-base64.utils', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64-image')),
}));

vi.mock('../password-strength-indicator/password-strength-indicator', () => ({
  PasswordStrengthIndicator: () => <div>Password strength</div>,
}));

describe('RHFForm', () => {
  it('renders form fields', () => {
    render(<RHFForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid name', async () => {
    render(<RHFForm onSubmit={vi.fn()} />);

    const nameInput = screen.getByLabelText(/name/i);

    await userEvent.type(nameInput, 'john');
    await userEvent.tab();

    expect(await screen.findByText(/first letter must be uppercase/i)).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const onSubmit = vi.fn();

    render(<RHFForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John');
    await userEvent.type(screen.getByLabelText(/^age$/i), '25');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Password1!');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Password1!');
    await userEvent.type(screen.getByLabelText(/country/i), 'Netherlands');
    await userEvent.click(screen.getByLabelText(/i accept terms & conditions/i));

    const file = new File(['image'], 'image.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText(/image/i), file);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
