import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './search';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const searchCharactersMock = vi.hoisted(() => vi.fn());

vi.mock('../../actions/search-actions', () => ({
  searchCharacters: searchCharactersMock,
}));

describe('Search', () => {
  beforeEach(() => {
    searchCharactersMock.mockClear();
  });

  it('should render search input and button', () => {
    renderWithIntl(<Search initialValue="" />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should render provided initial value in the input', () => {
    renderWithIntl(<Search initialValue="test value" />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('test value');
  });

  it('should render empty input when initial value is empty', () => {
    renderWithIntl(<Search initialValue="" />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('');
  });

  it('should update input value when value changes', async () => {
    const user = userEvent.setup();

    renderWithIntl(<Search initialValue="" />);

    const input = screen.getByRole('textbox', { name: /search characters/i });
    await user.type(input, 'r');

    expect(input).toHaveValue('r');
  });

  it('should submit search form with current value', async () => {
    const user = userEvent.setup();

    renderWithIntl(<Search initialValue="" />);

    const input = screen.getByRole('textbox', { name: /search characters/i });
    await user.type(input, 'morty');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(searchCharactersMock).toHaveBeenCalledTimes(1);
    expect(searchCharactersMock.mock.calls[0][0].get('search')).toBe('morty');
  });

  it('should submit search form when pressing Enter', async () => {
    const user = userEvent.setup();

    renderWithIntl(<Search initialValue="" />);

    const input = screen.getByRole('textbox', { name: /search characters/i });
    await user.type(input, '   morty   {Enter}');

    expect(searchCharactersMock).toHaveBeenCalledTimes(1);
    expect(searchCharactersMock.mock.calls[0][0].get('search')).toBe('   morty   ');
  });
});
