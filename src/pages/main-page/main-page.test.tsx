import { render, screen, waitFor } from '@testing-library/react';
import { RamapiService } from '../../api/ramapi-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import userEvent from '@testing-library/user-event';
import { mockCharacters, mockCharactersResponse } from '../../test-utils/mocks/characters';
import { MainPage } from './main-page';

vi.mock('../../api/ramapi-service', () => ({
  RamapiService: {
    getCharacters: vi.fn(),
  },
}));

describe('MainPage', () => {
  beforeEach(() => {
    vi.mocked(RamapiService.getCharacters).mockResolvedValue(mockCharactersResponse);
  });

  it('should load first page of characters on initial render', async () => {
    render(<MainPage />);

    await waitFor(() => {
      expect(RamapiService.getCharacters).toHaveBeenCalledTimes(1);
    });

    expect(RamapiService.getCharacters).toHaveBeenCalledWith(
      {
        name: '',
        page: 1,
      },
      expect.any(AbortSignal)
    );
  });

  it('should render characters after successful API request', async () => {
    render(<MainPage />);

    expect(await screen.findByRole('heading', { name: mockCharacters[0].name })).toBeInTheDocument();
  });

  it('should use saved search value from localStorage on initial render', async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    render(<MainPage />);

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('rick');

    await waitFor(() => {
      expect(RamapiService.getCharacters).toHaveBeenCalledWith(
        {
          name: 'rick',
          page: 1,
        },
        expect.any(AbortSignal)
      );
    });
  });

  it('should trim search value on submit and send request for the first page', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.type(input, '   morty   ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(input).toHaveValue('morty');
    await waitFor(() => {
      expect(RamapiService.getCharacters).toHaveBeenCalledWith(
        {
          name: 'morty',
          page: 1,
        },
        expect.any(AbortSignal)
      );
    });
  });

  it('should save search value to localStorage on search submit', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.type(input, 'morty');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM)).toBe('morty');
  });

  it('should update existing search value in localStorage on search submit', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    render(<MainPage />);

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.type(input, 'morty');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM)).toBe('morty');

    await waitFor(() => {
      expect(RamapiService.getCharacters).toHaveBeenCalledWith(
        {
          name: 'morty',
          page: 1,
        },
        expect.any(AbortSignal)
      );
    });
  });

  it('should remove saved search value from localStorage when empty value is submitted', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    render(<MainPage />);

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM)).toBeNull();
  });

  it('should not send a new request when search value has not changed', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    render(<MainPage />);

    await waitFor(() => {
      expect(RamapiService.getCharacters).toHaveBeenCalledTimes(1);
    });

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(RamapiService.getCharacters).toHaveBeenCalledTimes(1);
  });

  it('should show no results message when API return empty results', async () => {
    vi.mocked(RamapiService.getCharacters).mockResolvedValueOnce({
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    });

    render(<MainPage />);

    expect(await screen.findByText(/No characters found/i)).toBeInTheDocument();
  });

  it('shows meaningful error message when API request fails', async () => {
    vi.mocked(RamapiService.getCharacters).mockRejectedValueOnce(
      new Error('No characters found. Try another search term.')
    );

    render(<MainPage />);

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    expect(screen.getByText(/no characters found\. try another search term\./i)).toBeInTheDocument();
  });
});
