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
