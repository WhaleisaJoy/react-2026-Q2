'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { usePathname, useRouter } from '../i18n/navigation';

type UrlParamValue = string | number | null;
type UrlParams = Record<string, UrlParamValue>;
interface UpdateUrlParamsOptions {
  replace?: boolean;
}

export function useUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrlParams = useCallback(
    (params: UrlParams, options?: UpdateUrlParamsOptions) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          nextSearchParams.delete(key);
          return;
        }

        nextSearchParams.set(key, String(value));
      });

      const queryString = nextSearchParams.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      if (options?.replace) {
        router.replace(nextUrl, { scroll: false });
        return;
      }

      router.push(nextUrl, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return {
    searchParams,
    updateUrlParams,
  };
}
