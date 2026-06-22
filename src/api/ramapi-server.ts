import type { Character, CharactersResponse } from '../types/character';
import { BASE_URL } from './ramapi-config';
import { RAMAPI_ROUTES } from './ramapi-routes';

interface GetCharactersParams {
  name?: string;
  page?: number;
}

export async function fetchCharacters({ name = '', page = 1 }: GetCharactersParams): Promise<CharactersResponse> {
  const url = new URL(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}`);

  url.searchParams.set('name', name);
  url.searchParams.set('page', String(page));

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
