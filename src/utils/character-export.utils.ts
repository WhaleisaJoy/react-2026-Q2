import type { Character } from '../types/character';
import { convertToCsv, downloadCsv } from './csv.utils';

export function exportSelectedCharactersToCsv(selectedCharacters: Character[]) {
  const rows = selectedCharacters.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
    episodesCount: character.episode.length,
    detailsUrl: `${window.location.origin}/?details=${character.id}`,
    apiUrl: character.url,
    imageUrl: character.image,
  }));

  const csvData = convertToCsv(rows);
  const filename = `${selectedCharacters.length}_items`;
  downloadCsv(csvData, filename);
}
