import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, CharactersResponse } from '../types/character';
import { RAMAPI_ROUTES } from './ramapi-routes';
import { API_CACHE_TTL, BASE_URL } from './ramapi-config';

interface GetCharactersParams {
  name?: string;
  page?: number;
}

export const ramApi = createApi({
  reducerPath: 'ramApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Characters', 'Character'],
  keepUnusedDataFor: API_CACHE_TTL,
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, GetCharactersParams>({
      query: (params) => ({
        url: RAMAPI_ROUTES.CHARACTERS,
        params,
      }),

      providesTags: (result) =>
        result
          ? [
              { type: 'Characters', id: 'LIST' },
              ...result.results.map(({ id }) => ({ type: 'Character' as const, id })),
            ]
          : [{ type: 'Characters', id: 'LIST' }],
    }),

    getCharacter: builder.query<Character, number>({
      query: (id) => `${RAMAPI_ROUTES.CHARACTERS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = ramApi;
