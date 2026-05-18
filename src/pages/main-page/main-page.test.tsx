import { render, screen, waitFor } from '@testing-library/react';
import { getCharacters } from '../../api/ramapi-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import userEvent from '@testing-library/user-event';
import { mockCharacters, mockCharactersResponse } from '../../test-utils/mocks/characters';
import { MainPage } from './main-page';
import { MemoryRouter } from 'react-router';

const renderMainPage = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <MainPage />
    </MemoryRouter>
  );

vi.mock('../../api/ramapi-service', () => ({
  getCharacters: vi.fn(),
}));

describe('MainPage', () => {
  beforeEach(() => {
    vi.mocked(getCharacters).mockResolvedValue(mockCharactersResponse);
  });

  it('should load first page of characters on initial render', async () => {
    renderMainPage();

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledTimes(1);
    });

    expect(getCharacters).toHaveBeenCalledWith(
      {
        name: '',
        page: 1,
      },
      expect.any(AbortSignal)
    );
  });

  it('should render characters after successful API request', async () => {
    renderMainPage();

    expect(await screen.findByRole('heading', { name: mockCharacters[0].name })).toBeInTheDocument();
  });

  it('should use saved search value from localStorage on initial render', async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    renderMainPage();

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('rick');

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(
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

    renderMainPage();

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.type(input, '   morty   ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(input).toHaveValue('morty');
    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(
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

    renderMainPage();

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.type(input, 'morty');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM)).toBe('morty');
  });

  it('should update existing search value in localStorage on search submit', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    renderMainPage();

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.type(input, 'morty');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM)).toBe('morty');

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(
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

    renderMainPage();

    const input = screen.getByRole('textbox', { name: /search characters/i });

    await user.clear(input);
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM)).toBeNull();
  });

  it('should not send a new request when search value has not changed', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, 'rick');

    renderMainPage();

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledTimes(1);
    });

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(getCharacters).toHaveBeenCalledTimes(1);
  });

  it('should show no results message when API return empty results', async () => {
    vi.mocked(getCharacters).mockResolvedValueOnce({
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    });

    renderMainPage();

    expect(await screen.findByText(/No characters found/i)).toBeInTheDocument();
  });

  it('shows meaningful error message when API request fails', async () => {
    vi.mocked(getCharacters).mockRejectedValueOnce(new Error('No characters found. Try another search term.'));

    renderMainPage();

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    expect(screen.getByText(/no characters found\. try another search term\./i)).toBeInTheDocument();
  });

  it('should show pagination after characters are loaded when there are multiple pages', async () => {
    vi.mocked(getCharacters).mockResolvedValue({
      ...mockCharactersResponse,
      info: {
        ...mockCharactersResponse.info,
        pages: 3,
      },
    });

    renderMainPage('/?page=1');

    expect(await screen.findByText(/Page 1 of 3/i)).toBeInTheDocument();
  });
});
