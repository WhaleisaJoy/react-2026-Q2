import { configureStore } from '@reduxjs/toolkit';
import { ramApi } from './ramapi-service';
import { mockCharacters, mockCharactersResponse } from '../test-utils/mocks/characters';

const createStore = () =>
  configureStore({
    reducer: {
      [ramApi.reducerPath]: ramApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ramApi.middleware),
  });

describe('ramApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch characters', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify(mockCharactersResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const store = createStore();

    const result = await store.dispatch(
      ramApi.endpoints.getCharacters.initiate({
        name: 'rick',
        page: 1,
      })
    );

    expect(result.data).toEqual(mockCharactersResponse);
    expect(fetch).toHaveBeenCalled();
  });

  it('should return error for 404 response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const store = createStore();

    const result = await store.dispatch(
      ramApi.endpoints.getCharacters.initiate({
        name: 'unknown',
        page: 1,
      })
    );

    expect(result.error).toMatchObject({
      status: 404,
    });
  });

  it('should reuse cached character details for the same id', async () => {
    const mockCharacter = mockCharacters[0];

    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockCharacter), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const store = createStore();

    const firstResult = await store.dispatch(ramApi.endpoints.getCharacter.initiate(mockCharacter.id));

    const secondResult = await store.dispatch(ramApi.endpoints.getCharacter.initiate(mockCharacter.id));

    expect(firstResult.data).toEqual(mockCharacter);
    expect(secondResult.data).toEqual(mockCharacter);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should reuse cached characters for the same query args', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockCharactersResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const store = createStore();

    const queryArgs = {
      name: 'rick',
      page: 1,
    };

    const firstResult = await store.dispatch(ramApi.endpoints.getCharacters.initiate(queryArgs));

    const secondResult = await store.dispatch(ramApi.endpoints.getCharacters.initiate(queryArgs));

    expect(firstResult.data).toEqual(mockCharactersResponse);
    expect(secondResult.data).toEqual(mockCharactersResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
