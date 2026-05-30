import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { getCharacters } from '../api/ramapi-service';
import { isAbortError } from '../utils/errors.utils';

export function useCharactersData(searchTerm: string, page: number) {
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCharacters = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCharacters(
          {
            name: searchTerm.trim(),
            page: page,
          },
          abortController.signal
        );

        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setError(null);
      } catch (error) {
        if (isAbortError(error)) {
          return;
        }

        setCharacters([]);
        setTotalPages(1);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.');
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCharacters();

    return () => {
      abortController.abort();
    };
  }, [searchTerm, page]);

  return { characters, totalPages, isLoading, error };
}
