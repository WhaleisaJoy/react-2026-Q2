import { mockCharacters } from '../test-utils/mocks/characters';
import { exportSelectedCharactersToCsv } from './character-export.utils';
import { convertToCsv, downloadCsv } from './csv.utils';

vi.mock('./csv.utils', () => ({
  convertToCsv: vi.fn(() => 'csv-data'),
  downloadCsv: vi.fn(),
}));

describe('exportSelectedCharactersToCsv', () => {
  it('should convert selected characters to CSV and download file', () => {
    exportSelectedCharactersToCsv([mockCharacters[0]]);

    expect(convertToCsv).toHaveBeenCalledTimes(1);
    expect(convertToCsv).toHaveBeenCalledWith([
      {
        id: mockCharacters[0].id,
        name: mockCharacters[0].name,
        status: mockCharacters[0].status,
        species: mockCharacters[0].species,
        gender: mockCharacters[0].gender,
        origin: mockCharacters[0].origin.name,
        location: mockCharacters[0].location.name,
        episodesCount: mockCharacters[0].episode.length,
        detailsUrl: `${window.location.origin}/?details=${mockCharacters[0].id}`,
        apiUrl: mockCharacters[0].url,
        imageUrl: mockCharacters[0].image,
      },
    ]);

    expect(downloadCsv).toHaveBeenCalledTimes(1);
    expect(downloadCsv).toHaveBeenCalledWith('csv-data', '1_items');
  });
});
