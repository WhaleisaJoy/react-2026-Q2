import { useCallback, useEffect, useState } from 'react';
import { CharacterList } from '../../components/character-list/character-list';
import { ErrorTestButton } from '../../components/error-test-button/error-test-button';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/shared/loader/loader';
import type { Character } from '../../types/character';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import { RamapiService } from '../../api/ramapi-service';
import { Pagination } from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router';
import { getValidPage } from '../../utils/utils';

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = getValidPage(searchParams.get('page'));
  const [totalPages, setTotalPages] = useState(1);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState(() => localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM) ?? '');
  const [submittedSearchValue, setSubmittedSearchValue] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM) ?? ''
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updatePageInUrl = useCallback(
    (page: number, replace = false) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set('page', String(page));
      setSearchParams(newSearchParams, { replace });
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const pageParam = searchParams.get('page');

    if (pageParam !== String(currentPage)) {
      updatePageInUrl(currentPage, true);
    }
  }, [currentPage, searchParams, updatePageInUrl]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCharacters = async () => {
      const normalizedSearchValue = submittedSearchValue.trim();

      try {
        const data = await RamapiService.getCharacters(
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
      localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, normalizedSearchValue);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SEARCH_TERM);
    }

    setIsLoading(true);
    setError(null);
    setSubmittedSearchValue(normalizedSearchValue);
    updatePageInUrl(1);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setIsLoading(true);
    setError(null);
    updatePageInUrl(page);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="app-error" role="alert">
          <h3 className="app-error__title">Oops!</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (characters.length === 0) {
      return <p className="app__no-results">No characters found</p>;
    }

    return <CharacterList characters={characters} />;
  };

  const shouldShowPagination = !isLoading && !error && characters.length > 0 && totalPages > 1;

  return (
    <>
      <Search value={searchValue} onChange={handleSearchChange} onSubmit={handleSearchSubmit} />

      <div className="error-button-wrapper">
        <ErrorTestButton />
      </div>

      {renderContent()}

      {shouldShowPagination && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
}
