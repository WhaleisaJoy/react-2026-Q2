import { convertToCsv, downloadCsv } from './csv.utils';

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

describe('downloadCsv', () => {
  it('should create and click download link', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    downloadCsv('csv-data', 'test-file');

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test');
  });
});
