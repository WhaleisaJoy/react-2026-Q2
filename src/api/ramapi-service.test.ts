import { mockCharacters, mockCharactersResponse } from '../test-utils/mocks/characters';
import { RAMAPI_ROUTES } from './ramapi-routes';
import { BASE_URL, getCharacter, getCharacters } from './ramapi-service';

describe('RamapiService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch characters without query params', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    const result = await getCharacters();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}`, { signal: undefined });
    expect(result).toEqual(mockCharactersResponse);
  });

  it('should fetch characters with query params', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    await getCharacters({
      name: 'rick',
      page: 1,
    });

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}?name=rick&page=1`, {
      signal: undefined,
    });
  });

  it('should pass abort signal to fetch', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharactersResponse,
    } as Response);

    const abortController = new AbortController();

    await getCharacters(
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
      getCharacters({
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
      getCharacters({
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
      getCharacters({
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
      getCharacters({
        name: 'rick',
        page: 1,
      })
    ).rejects.toThrow('Something went wrong. Please try again later.');
  });

  it('should fetch character by id', async () => {
    const mockCharacter = mockCharacters[0];

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    const result = await getCharacter(mockCharacter.id);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}/${mockCharacter.id}`, {
      signal: undefined,
    });
    expect(result).toEqual(mockCharacter);
  });

  it('should throw meaningful details error for 404 response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(getCharacter(999)).rejects.toThrow('Character details were not found.');
  });

  it('should throw meaningful details error for 4xx response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
    } as Response);

    await expect(getCharacter(1)).rejects.toThrow('Unable to load character details. Please try another character.');
  });
});
