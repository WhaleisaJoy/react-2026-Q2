export function getValidPage(value: string | null): number {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export function getValidDetailsId(value: string | null): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

interface BuildSearchUrlParams {
  searchValue?: string;
  page?: number;
  details?: number | null;
}

export function buildSearchUrl({ searchValue = '', page = 1, details = null }: BuildSearchUrlParams) {
  const params = new URLSearchParams();
  const normalizedSearchValue = searchValue.trim();

  if (normalizedSearchValue !== '') {
    params.set('search', normalizedSearchValue);
  }

  if (page > 1) {
    params.set('page', String(page));
  }

  if (details !== null) {
    params.set('details', String(details));
  }

  const queryString = params.toString();

  return queryString ? `?${queryString}` : '/';
}
