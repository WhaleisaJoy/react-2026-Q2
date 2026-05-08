import { Component } from 'react';
import './App.scss';
import type { Character } from './types/character';
import { RamapiService } from './api/ramapi-service';
import { Search } from './components/search/search';
import { CharacterList } from './components/character-list/character-list';
import { LOCAL_STORAGE_KEYS } from './constants/local-storage';
import Loader from './components/shared/loader/loader';
import { ErrorTestButton } from './components/error-test-button/error-test-button';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { Header } from './components/header/header';

type State = {
  characters: Character[];
  searchValue: string;
  isLoading: boolean;
  error: string | null;
};

export default class App extends Component {
  private abortController: AbortController | null = null;
  private lastRequestedSearchValue = '';

  state: State = {
    characters: [],
    searchValue: '',
    isLoading: false,
    error: null,
  };

  componentDidMount(): void {
    const savedSearchValue = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_TERM) ?? '';

    this.setState({ searchValue: savedSearchValue }, () => this.loadCharacters(savedSearchValue));
  }

  loadCharacters = async (searchValue: string) => {
    const normalizedSearchValue = searchValue.trim();

    this.lastRequestedSearchValue = normalizedSearchValue;

    this.abortController?.abort();
    this.abortController = new AbortController();

    this.setState({
      isLoading: true,
      error: null,
    });

    try {
      const data = await RamapiService.getCharacters(
        {
          name: normalizedSearchValue,
          page: 1,
        },
        this.abortController.signal
      );

      this.setState({
        characters: data.results,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      this.setState({
        characters: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  handleSearchChange = (value: string) => {
    this.setState({
      searchValue: value,
    });
  };

  handleSearchSubmit = () => {
    const normalizedSearchValue = this.state.searchValue.trim();

    this.setState({
      searchValue: normalizedSearchValue,
    });

    if (normalizedSearchValue === this.lastRequestedSearchValue) {
      return;
    }

    if (normalizedSearchValue !== '') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_TERM, normalizedSearchValue);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SEARCH_TERM);
    }

    this.loadCharacters(normalizedSearchValue);
  };

  renderContent() {
    const { characters, isLoading, error } = this.state;

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
  }

  render() {
    const { searchValue } = this.state;

    return (
      <ErrorBoundary>
        <div className="app">
          <Header>
            <Search value={searchValue} onChange={this.handleSearchChange} onSubmit={this.handleSearchSubmit} />
          </Header>

          <main className="app-main">
            <div className="error-button-wrapper">
              <ErrorTestButton />
            </div>

            {this.renderContent()}
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}
