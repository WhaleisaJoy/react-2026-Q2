import './main-page.scss';
import { ErrorTestButton } from '../../components/error-test-button/error-test-button';
import { Search } from '../../components/search/search';
import { Pagination } from '../../components/pagination/pagination';
import { Outlet } from 'react-router';
import { CharacterListSection } from '../../components/character-list-section/character-list-section';
import { useMainPage } from '../../hooks/use-main-page';
import { SelectionBar } from '../../components/selection-bar/selection-bar';

export function MainPage() {
  const {
    characters,
    isLoading,
    errorMessage,
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
  } = useMainPage();

  return (
    <div className={`main-page ${selectedCharacterId ? 'main-page--with-details' : ''}`}>
      <section className="main-page__content">
        <Search value={searchValue} onChange={handleSearchChange} onSubmit={handleSearchSubmit} />

        <div className="error-button-wrapper">
          <ErrorTestButton />
        </div>

        <CharacterListSection
          isLoading={isLoading}
          error={errorMessage}
          characters={characters}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={openDetails}
        />

        {shouldShowPagination && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </section>

      {selectedCharacterId && (
        <aside className="main-page__details">
          <Outlet context={{ selectedCharacterId, onClose: closeDetails }} />
        </aside>
      )}

      <SelectionBar />
    </div>
  );
}
