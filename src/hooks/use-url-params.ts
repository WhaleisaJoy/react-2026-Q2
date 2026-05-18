import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

type UrlParamValue = string | number | null;
type UrlParams = Record<string, UrlParamValue>;
interface UpdateUrlParamsOptions {
  replace?: boolean;
}

export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrlParams = useCallback(
    (params: UrlParams, options?: UpdateUrlParamsOptions) => {
      const nextSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          nextSearchParams.delete(key);
          return;
        }

        nextSearchParams.set(key, String(value));
      });

      setSearchParams(nextSearchParams, {
        replace: options?.replace,
      });
    },
    [searchParams, setSearchParams]
  );

  return {
    searchParams,
    updateUrlParams,
  };
}
