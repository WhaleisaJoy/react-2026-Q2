import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './search';

describe('Search', () => {
  it('should render search input and button', () => {
    render(<Search value="" onChange={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should render provided value in the input', () => {
    render(<Search value="test value" onChange={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('test value');
  });

  it('should render empty input when value is empty', () => {
    render(<Search value="" onChange={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('');
  });

  it('should call onChange when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Search value="" onChange={handleChange} onSubmit={vi.fn()} />);

    const input = screen.getByRole('textbox', { name: /search characters/i });
    await user.type(input, 'r');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('r');
  });

  it('should call onSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<Search value="" onChange={vi.fn()} onSubmit={handleSubmit} />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it('should call onSubmit when form is submitted by pressing Enter', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<Search value="" onChange={vi.fn()} onSubmit={handleSubmit} />);

    const input = screen.getByRole('textbox', { name: /search characters/i });
    await user.type(input, '{Enter}');

    expect(handleSubmit).toHaveBeenCalledOnce();
  });
});
