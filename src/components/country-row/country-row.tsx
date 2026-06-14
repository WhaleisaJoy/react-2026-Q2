import type { RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';

interface CountryRowProps {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}

export function CountryRow({ index, style, countries, selectedYear, selectedColumns }: RowComponentProps<CountryRowProps>) {
  return (
    <div style={style}>
      <CountryCard
        country={countries[index]}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  )
}