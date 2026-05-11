import { mockCharactersResponse } from '../test-utils/mocks/characters';
import { RAMAPI_ROUTES } from './ramapi-routes';
import { BASE_URL, RamapiService } from './ramapi-service';

describe('RamapiService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch characters without query params', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    const result = await RamapiService.getCharacters();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}`, { signal: undefined });
    expect(result).toEqual(mockCharactersResponse);
  });

  it('should fetch characters with query params', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    await RamapiService.getCharacters({
      name: 'rick',
      page: 1,
    });

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}?name=rick&page=1`, {
      signal: undefined,
    });
  });

  it('should trim string params before request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    await RamapiService.getCharacters({
      name: '  morty   ',
      page: 1,
    });

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}?name=morty&page=1`, {
      signal: undefined,
    });
  });

  it('should pass abort signal to fetch', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    const abortController = new AbortController();

    await RamapiService.getCharacters(
      {
        name: 'rick',
        page: 1,
      },
      abortController.signal
    );

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}?name=rick&page=1`, {
      signal: abortController.signal,
    });
  });

  it('should throw meaningful error for 404 response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(
      RamapiService.getCharacters({
        name: 'unknown character',
        page: 1,
      })
    ).rejects.toThrow('No characters found. Try another search term.');
  });

  it('should throw meaningful error for 4xx response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
    } as Response);

    await expect(
      RamapiService.getCharacters({
        name: 'rick',
        page: 1,
      })
    ).rejects.toThrow('The request was incorrect. Please check your search and try again.');
  });

  it('should throw meaningful error for 5xx response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(
      RamapiService.getCharacters({
        name: 'rick',
        page: 1,
      })
    ).rejects.toThrow('Something went wrong on the server. Please try again later.');
  });

  it('should throw fallback error for unexpected non ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 300,
    } as Response);

    await expect(
      RamapiService.getCharacters({
        name: 'rick',
        page: 1,
      })
    ).rejects.toThrow('Something went wrong. Please try again later.');
  });
});
