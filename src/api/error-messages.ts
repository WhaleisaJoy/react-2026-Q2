import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export type ApiErrorMessageKey =
  | 'charactersNotFound'
  | 'charactersBadRequest'
  | 'charactersServerError'
  | 'charactersUnknownError'
  | 'detailsNotFound'
  | 'detailsBadRequest'
  | 'detailsServerError'
  | 'detailsUnknownError';

export function getCharactersErrorMessageKey(error: unknown): ApiErrorMessageKey {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as FetchBaseQueryError).status);

    if (status === 404) {
      return 'charactersNotFound';
    }

    if (status >= 400 && status < 500) {
      return 'charactersBadRequest';
    }

    if (status >= 500) {
      return 'charactersServerError';
    }
  }

  return 'charactersUnknownError';
}

export function getDetailsErrorMessageKey(error: unknown): ApiErrorMessageKey {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as FetchBaseQueryError).status);

    if (status === 404) {
      return 'detailsNotFound';
    }

    if (status >= 400 && status < 500) {
      return 'detailsBadRequest';
    }

    if (status >= 500) {
      return 'detailsServerError';
    }
  }

  return 'detailsUnknownError';
}
