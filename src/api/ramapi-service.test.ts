import { configureStore } from '@reduxjs/toolkit';
import { ramApi } from './ramapi-service';
import { mockCharactersResponse } from '../test-utils/mocks/characters';

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
});
