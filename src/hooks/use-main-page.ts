import { useEffect } from 'react';
import type { Character } from '../types/character';
import { getValidDetailsId, getValidPage } from '../utils/url-params.utils';
import { useUrlParams } from './use-url-params';
import { useCharacterSearch } from './use-character-search';
import { useGetCharactersQuery } from '../api/ramapi-service';
import { getCharactersErrorMessage } from '../api/error-messages';

interface UseMainPageResult {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
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
  const { searchParams, updateUrlParams } = useUrlParams();

  const selectedCharacterId = getValidDetailsId(searchParams.get('details'));
  const currentPage = getValidPage(searchParams.get('page'));

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

  const { searchValue, submittedSearchValue, handleSearchChange, handleSearchSubmit } = useCharacterSearch(() => {
    updateUrlParams({
      page: 1,
      details: null,
    });
  });

  const { data, isLoading, error } = useGetCharactersQuery({
    name: submittedSearchValue.trim(),
    page: currentPage,
  });

  const characters = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;
  const errorMessage = error ? getCharactersErrorMessage(error) : null;

  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    updateUrlParams({
      page,
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

  const shouldShowPagination = !isLoading && !errorMessage && characters.length > 0 && totalPages > 1;

  return {
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
  };
}
