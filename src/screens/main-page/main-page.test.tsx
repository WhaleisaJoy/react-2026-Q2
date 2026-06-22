import { screen, waitFor } from '@testing-library/react';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import userEvent from '@testing-library/user-event';
import { mockCharacters, mockCharactersResponse } from '../../test-utils/mocks/characters';
import { MainPage } from './main-page';
import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from '../../store/characters-reducer/characters-reducer';
import { Provider } from 'react-redux';
import { ramApi } from '../../api/ramapi-service';
import { useSearchParams } from 'next/navigation';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const pushMock = vi.fn();
const replaceMock = vi.fn();
const pathnameMock = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('../../i18n/navigation', () => ({
  usePathname: pathnameMock,
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

const renderMainPage = (path = '/') => {
  const [pathname, queryString = ''] = path.split('?');

  pathnameMock.mockReturnValue(pathname);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(queryString) as ReturnType<typeof useSearchParams>);

  const store = configureStore({
    reducer: {
      characters: charactersReducer,
      [ramApi.reducerPath]: ramApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ramApi.middleware),
  });

  renderWithIntl(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

const createJsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const getFetchUrl = (callIndex = 0) => {
  const input = vi.mocked(fetch).mock.calls[callIndex][0];

  return input instanceof Request ? input.url : String(input);
};

describe('MainPage', () => {
  beforeEach(() => {
    pushMock.mockClear();
    replaceMock.mockClear();
    vi.stubGlobal('fetch', vi.fn());
    vi.mocked(fetch).mockImplementation(() => Promise.resolve(createJsonResponse(mockCharactersResponse)));
  });

  it('should load first page of characters on initial render', async () => {
    renderMainPage();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(getFetchUrl()).toContain('/character?name=&page=1');
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
      expect(getFetchUrl()).toContain('/character?name=rick&page=1');
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
      expect(getFetchUrl(1)).toContain('/character?name=morty&page=1');
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
      expect(getFetchUrl(1)).toContain('/character?name=morty&page=1');
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
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should show no results message when API return empty results', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse({
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      })
    );

    renderMainPage();

    expect(await screen.findByText(/No characters found/i)).toBeInTheDocument();
  });

  it('shows meaningful error message when API request fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createJsonResponse({ error: 'Not found' }, 404));

    renderMainPage();

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    expect(screen.getByText(/no characters found\. try another search term\./i)).toBeInTheDocument();
  });

  it('should show pagination after characters are loaded when there are multiple pages', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse({
        ...mockCharactersResponse,
        info: {
          ...mockCharactersResponse.info,
          pages: 3,
        },
      })
    );

    renderMainPage('/?page=1');

    expect(await screen.findByText(/Page 1 of 3/i)).toBeInTheDocument();
  });

  it('should refetch characters when refresh button is clicked', async () => {
    const user = userEvent.setup();

    renderMainPage();

    expect(await screen.findByRole('heading', { name: mockCharacters[0].name })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it('should show loader while characters are loading', () => {
    vi.mocked(fetch).mockReturnValueOnce(new Promise(() => {}) as Promise<Response>);

    renderMainPage();

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('should reuse cached characters when returning to a previously loaded page', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValueOnce(
      createJsonResponse({
        ...mockCharactersResponse,
        info: {
          ...mockCharactersResponse.info,
          pages: 2,
        },
      })
    );

    renderMainPage('/?page=1');

    expect(await screen.findByRole('heading', { name: mockCharacters[0].name })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '>' }));

    expect(pushMock).toHaveBeenCalledWith('/?page=2', { scroll: false });
  });

  it('should show list refresh indicator while characters are refetching', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch)
      .mockResolvedValueOnce(createJsonResponse(mockCharactersResponse))
      .mockReturnValueOnce(new Promise(() => {}) as Promise<Response>);

    renderMainPage();

    expect(await screen.findByRole('heading', { name: mockCharacters[0].name })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    expect(await screen.findByLabelText(/refreshing characters/i)).toBeInTheDocument();
  });
});
