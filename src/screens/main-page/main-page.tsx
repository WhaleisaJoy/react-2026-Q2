import './main-page.scss';
import { ErrorTestButton } from '../../components/error-test-button/error-test-button';
import { Search } from '../../components/search/search';
import { Pagination } from '../../components/pagination/pagination';
import { CharacterListSection } from '../../components/character-list-section/character-list-section';
import { SelectionBar } from '../../components/selection-bar/selection-bar';
import type { Character } from '../../types/character';
import { RefreshButton } from '../../refresh-button/refresh-button';
import { buildSearchUrl } from '../../utils/url-params.utils';
import { CharacterDetails } from '../../components/character-details/character-details';

interface Props {
  characters: Character[];
  totalPages: number;
  currentPage: number;
  searchValue: string;
  selectedCharacterId: number | null;
}

export function MainPage({ characters, totalPages, currentPage, searchValue, selectedCharacterId }: Props) {
  const shouldShowPagination = characters.length > 0 && totalPages > 1;

  return (
    <div className={`main-page ${selectedCharacterId ? 'main-page--with-details' : ''}`}>
      <section className="main-page__content">
        <Search initialValue={searchValue} />

        <div className="error-button-wrapper">
          <ErrorTestButton />
          <RefreshButton />
        </div>

        <div className="main-page__list-wrapper">
          <CharacterListSection
            characters={characters}
            selectedCharacterId={selectedCharacterId}
            searchValue={searchValue}
            currentPage={currentPage}
          />
        </div>

        {shouldShowPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchValue={searchValue}
            selectedCharacterId={selectedCharacterId}
          />
        )}
      </section>

      {selectedCharacterId && (
        <aside className="main-page__details">
          <CharacterDetails
            selectedCharacterId={selectedCharacterId}
            closeHref={buildSearchUrl({
              searchValue,
              page: currentPage,
            })}
          />
        </aside>
      )}

      <SelectionBar />
    </div>
  );
}
