import type { CharactersResponse } from '../types/character';
import { RAMAPI_ROUTES } from './ramapi-routes';

export const BASE_URL = 'https://rickandmortyapi.com/api';

interface GetCharactersParams {
  name?: string;
  page?: number;
}

export class RamapiService {
  static async getCharacters(params: GetCharactersParams = {}, signal?: AbortSignal): Promise<CharactersResponse> {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, String(value).trim());
        }
      });
    }

    const queryString = searchParams.toString();
    const url = queryString ? `${RAMAPI_ROUTES.CHARACTERS}?${queryString}` : RAMAPI_ROUTES.CHARACTERS;

    const res = await fetch(`${BASE_URL}${url}`, { signal });

    if (!res.ok) {
      throw new Error(getCharactersErrorMessage(res.status));
    }

    return await res.json();
  }
}

function getCharactersErrorMessage(status: number): string {
  if (status === 404) {
    return 'No characters found. Try another search term.';
  }

  if (status >= 400 && status < 500) {
    return 'The request was incorrect. Please check your search and try again.';
  }

  if (status >= 500) {
    return 'Something went wrong on the server. Please try again later.';
  }

  return 'Something went wrong. Please try again later.';
}
