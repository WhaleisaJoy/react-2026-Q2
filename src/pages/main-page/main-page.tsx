import { useEffect, useState } from 'react';
import { CharacterList } from '../../components/character-list/character-list';
import { ErrorTestButton } from '../../components/error-test-button/error-test-button';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/shared/loader/loader';
import type { Character } from '../../types/character';
import { LOCAL_STORAGE_KEYS } from '../../constants/local-storage';
import { RamapiService } from '../../api/ramapi-service';

export function MainPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState(() => localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM) ?? '');
  const [submittedSearchValue, setSubmittedSearchValue] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM) ?? ''
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCharacters = async () => {
      const normalizedSearchValue = submittedSearchValue.trim();

      try {
        const data = await RamapiService.getCharacters(
          {
            name: normalizedSearchValue,
            page: 1,
          },
          abortController.signal
        );

        setCharacters(data.results);
        setError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setCharacters([]);
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
  }, [submittedSearchValue]);

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

  return (
    <div className="app">
      <Header>
        <Search value={searchValue} onChange={handleSearchChange} onSubmit={handleSearchSubmit} />
      </Header>

      <main className="app-main">
        <div className="error-button-wrapper">
          <ErrorTestButton />
        </div>

        {renderContent()}
      </main>
    </div>
  );
}
