import { createSlice } from '@reduxjs/toolkit';
import type { CountriesState } from '../../types/state';
import { countries } from '../../const/countries.const';

const initialState: CountriesState = {
  countries: countries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
