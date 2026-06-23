import { BASE_URL } from '../../../../api/ramapi-config';
import { RAMAPI_ROUTES } from '../../../../api/ramapi-routes';
import type { Character } from '../../../../types/character';
import { convertToCsv, createCharacterCsvRows } from '../../../../utils/csv.utils';

export async function POST(request: Request) {
  const formData = await request.formData();
  const ids = getValidIds(formData);

  if (ids.length === 0) {
    return new Response('No characters selected', {
      status: 400,
    });
  }

  try {
    const characters = await fetchCharactersByIds(ids);
    const origin = new URL(request.url).origin;
    const rows = createCharacterCsvRows(characters, origin);
    const csvData = convertToCsv(rows);
    const filename = `${characters.length}_items.csv`;

    return new Response(csvData, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return new Response('Failed to generate CSV', {
      status: 500,
    });
  }
}

function getValidIds(formData: FormData): number[] {
  return formData
    .getAll('ids')
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);
}

async function fetchCharactersByIds(ids: number[]): Promise<Character[]> {
  const response = await fetch(`${BASE_URL}${RAMAPI_ROUTES.CHARACTERS}/${ids.join(',')}`);

  if (!response.ok) {
    throw new Error('Failed to fetch characters for CSV export');
  }

  const data: Character | Character[] = await response.json();

  return Array.isArray(data) ? data : [data];
}
