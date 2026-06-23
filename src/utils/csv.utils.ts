import type { Character } from '../types/character';

type CsvRow = Record<string, string | number>;

const CSV_SEPARATOR = ';';

function escapeCsvValue(value: string | number): string {
  const stringValue = String(value);

  const shouldEscape = stringValue.includes(CSV_SEPARATOR) || stringValue.includes('"') || stringValue.includes('\n');

  if (!shouldEscape) {
    return stringValue;
  }

  return `"${stringValue.replaceAll('"', '""')}"`;
}

export function convertToCsv(data: CsvRow[]): string {
  if (data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(CSV_SEPARATOR));
  const csvData = [`sep=${CSV_SEPARATOR}`, headers.join(CSV_SEPARATOR), ...csvRows].join('\n');

  return csvData;
}

export function createCharacterCsvRows(characters: Character[], origin: string) {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
    episodesCount: character.episode.length,
    detailsUrl: `${origin}/?details=${character.id}`,
    apiUrl: character.url,
    imageUrl: character.image,
  }));
}
