import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export function getCharactersErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as FetchBaseQueryError).status);

    if (status === 404) {
      return 'No characters found. Try another search term.';
    }

    if (status >= 400 && status < 500) {
      return 'The request was incorrect. Please check your search and try again.';
    }

    if (status >= 500) {
      return 'Something went wrong on the server. Please try again later.';
    }
  }

  return 'Something went wrong. Please try again later.';
}

export function getDetailsErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as FetchBaseQueryError).status);

    if (status === 404) {
      return 'Character details were not found.';
    }

    if (status >= 400 && status < 500) {
      return 'Unable to load character details. Please try another character.';
    }

    if (status >= 500) {
      return 'Details server is currently unavailable. Please try again later.';
    }
  }

  return 'Something went wrong while loading character details.';
}
