import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage';
import type { Character } from '../types/character';
import { getValidDetailsId, getValidPage } from '../utils/utils';
import { useLocalStorage } from './use-local-storage';
import { useUrlParams } from './use-url-params';
import { getCharacters } from '../api/ramapi-service';

interface UseMainPageResult {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchValue: string;
  selectedCharacterId: number | null;
  shouldShowPagination: boolean;
  handleSearchChange: (value: string) => void;
  handleSearchSubmit: () => void;
  handlePageChange: (page: number) => void;
  openDetails: (id: number) => void;
  closeDetails: () => void;
}

export function useMainPage(): UseMainPageResult {
  const {
    value: submittedSearchValue,
    setValue: setSubmittedSearchValue,
    removeValue: removeSubmittedSearchValue,
  } = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_TERM);

  const { searchParams, updateUrlParams } = useUrlParams();

  const selectedCharacterId = getValidDetailsId(searchParams.get('details'));
  const currentPage = getValidPage(searchParams.get('page'));
  const [totalPages, setTotalPages] = useState(1);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState(submittedSearchValue);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pageParam = searchParams.get('page');

    if (pageParam !== String(currentPage)) {
      updateUrlParams(
        {
          page: currentPage,
        },
        {
          replace: true,
        }
      );
    }
  }, [currentPage, searchParams, updateUrlParams]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCharacters = async () => {
      const normalizedSearchValue = submittedSearchValue.trim();

      try {
        const data = await getCharacters(
          {
            name: normalizedSearchValue,
            page: currentPage,
          },
          abortController.signal
        );

        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
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
  }, [submittedSearchValue, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    const normalizedSearchValue = searchValue.trim();

    setSearchValue(normalizedSearchValue);

    if (normalizedSearchValue === submittedSearchValue) {
      return;
    }

    if (normalizedSearchValue !== '') {
      setSubmittedSearchValue(normalizedSearchValue);
    } else {
      removeSubmittedSearchValue();
    }

    setIsLoading(true);
    setError(null);
    updateUrlParams({
      page: 1,
      details: null,
    });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setIsLoading(true);
    setError(null);
    updateUrlParams({
      page,
      details: null,
    });
  };

  const openDetails = (id: number) => {
    updateUrlParams({
      details: id,
    });
  };

  const closeDetails = () => {
    updateUrlParams({
      details: null,
    });
  };

  const shouldShowPagination = !isLoading && !error && characters.length > 0 && totalPages > 1;

  return {
    characters,
    isLoading,
    error,
    currentPage,
    totalPages,
    searchValue,
    selectedCharacterId,
    shouldShowPagination,
    handleSearchChange,
    handleSearchSubmit,
    handlePageChange,
    openDetails,
    closeDetails,
  };
}
