import { convertToCsv } from './csv.utils';

describe('convertToCsv', () => {
  it('should convert rows to CSV', () => {
    const result = convertToCsv([
      {
        id: 1,
        name: 'Rick',
      },
    ]);

    expect(result).toBe('sep=;\nid;name\n1;Rick');
  });

  it('should return empty string for empty data', () => {
    expect(convertToCsv([])).toBe('');
  });

  it('should escape special values', () => {
    const result = convertToCsv([
      {
        name: 'Rick; "Scientist"',
      },
    ]);

    expect(result).toBe('sep=;\nname\n"Rick; ""Scientist"""');
  });
});
