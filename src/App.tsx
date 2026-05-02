import { Component } from 'react';
import './App.scss';
import type { Character } from './types/character';
import { RamapiService } from './api/ramapi-service';
import { Search } from './components/search/search';
import { CharacterList } from './components/character-list/character-list';
import { LOCAL_STORAGE_KEYS } from './constants/local-storage';

type State = {
  characters: Character[];
  searchValue: string;
  isLoading: boolean;
};

export default class App extends Component {
  private abortController: AbortController | null = null;
  private lastRequestedSearchValue = '';

  state: State = {
    characters: [],
    searchValue: '',
    isLoading: false,
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

    this.setState({ isLoading: true });

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
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      this.setState({
        characters: [],
        isLoading: false,
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
    const { characters } = this.state;

    if (characters.length === 0) {
      return <p className="app__no-results">No characters found</p>;
    }

    return <CharacterList characters={characters} />;
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div className="app">
        <main>
          <Search value={searchValue} onChange={this.handleSearchChange} onSubmit={this.handleSearchSubmit} />

          {this.renderContent()}
        </main>
      </div>
    );
  }
}
