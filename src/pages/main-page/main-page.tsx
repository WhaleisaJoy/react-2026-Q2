import './main-page.scss';
import { useEffect, useState } from 'react';
import { CharacterList } from '../../components/character-list/character-list';
import { ErrorTestButton } from '../../components/error-test-button/error-test-button';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/shared/loader/loader';
import type { Character } from '../../types/character';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import { getCharacters } from '../../api/ramapi-service';
import { Pagination } from '../../components/pagination/pagination';
import { Outlet } from 'react-router';
import { getValidDetailsId, getValidPage } from '../../utils/utils';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { useUrlParams } from '../../hooks/use-url-params';

export function MainPage() {
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

    return (
      <CharacterList
        characters={characters}
        selectedCharacterId={selectedCharacterId}
        onSelectCharacter={openDetails}
      />
    );
  };

  const shouldShowPagination = !isLoading && !error && characters.length > 0 && totalPages > 1;

  return (
    <div className={`main-page ${selectedCharacterId ? 'main-page--with-details' : ''}`}>
      <section className="main-page__content">
        <Search value={searchValue} onChange={handleSearchChange} onSubmit={handleSearchSubmit} />

        <div className="error-button-wrapper">
          <ErrorTestButton />
        </div>

        {renderContent()}

        {shouldShowPagination && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </section>

      {selectedCharacterId && (
        <aside className="main-page__details">
          <Outlet context={{ selectedCharacterId, onClose: closeDetails }} />
        </aside>
      )}
    </div>
  );
}
