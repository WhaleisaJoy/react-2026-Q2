'use client';

import { useCallback, useState } from 'react';

export function useLocalStorage(key: string, initialValue = '') {
  const [value, setStateValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = useCallback(
    (newValue: string) => {
      setStateValue(newValue);

      if (newValue === '') {
        localStorage.removeItem(key);
        return;
      }

      localStorage.setItem(key, newValue);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStateValue(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return {
    value,
    setValue,
    removeValue,
  };
}
