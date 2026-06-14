import type { Country } from '../../types';

import styles from './country-list.module.css';
import { List, useDynamicRowHeight } from 'react-window';
import { CountryRow } from '../country-row/country-row';
import { useMemo } from 'react';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase();

    const filtered = countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(normalizedSearchQuery);
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      });

    if (sortField === 'name') {
      return filtered.sort((a, b) => (
        sortOrder === 'asc'
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id)
      ));
    }

    const countriesWithPopulation = filtered.map((country) => {
      const population = country.data.find((d) => d.year === selectedYear)?.population ?? 0;

      return {
        country,
        population,
      }
    });

    countriesWithPopulation.sort((a, b) => (
      sortOrder === 'asc'
        ? a.population - b.population
        : b.population - a.population
    ));

    return countriesWithPopulation.map((item) => item.country);
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 296,
  });

  const rowProps = useMemo(() => ({
    countries: filteredCountries,
    selectedYear,
    selectedColumns
  }), [filteredCountries, selectedYear, selectedColumns]);

  return (
    <div className={styles.countryList}>
      <List
        rowComponent={CountryRow}
        rowCount={filteredCountries.length}
        rowHeight={rowHeight}
        rowProps={rowProps}
      />
    </div>
  );
};


