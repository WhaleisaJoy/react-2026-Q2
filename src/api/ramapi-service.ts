import type { CharactersResponse } from '../types/character';
import { RAMAPI_ROUTES } from './ramapi-routes';

const BASE_URL = 'https://rickandmortyapi.com/api';

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
      throw new Error(`Could not fetch characters, status: ${res.status}`);
    }

    return await res.json();
  }
}
