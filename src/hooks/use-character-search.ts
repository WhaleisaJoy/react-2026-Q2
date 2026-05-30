import { useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage';
import { useLocalStorage } from './use-local-storage';

export function useCharacterSearch(onSubmit: () => void) {
  const {
    value: submittedSearchValue,
    setValue: setSubmittedSearchValue,
    removeValue: removeSubmittedSearchValue,
  } = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_TERM);

  const [searchValue, setSearchValue] = useState(submittedSearchValue);

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

    onSubmit();
  };

  return {
    searchValue,
    submittedSearchValue,
    handleSearchChange,
    handleSearchSubmit,
  };
}
