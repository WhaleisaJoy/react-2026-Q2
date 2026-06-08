import type { Country } from '../const/countries.const';
import type { Submission } from './submission';

export interface CountriesState {
  countries: readonly Country[];
}

export interface SubmissionsState {
  submissions: Submission[];
}
