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

export function downloadCsv(csvData: string, filename?: string) {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);

  link.click();
  URL.revokeObjectURL(url);
}
