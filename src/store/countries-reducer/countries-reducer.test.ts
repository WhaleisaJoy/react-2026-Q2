import { countries } from '../../const/countries.const';
import { countriesReducer } from './countries-reducer';

describe('CountriesReducer', () => {
  it('returns initial state', () => {
    expect(countriesReducer(undefined, { type: 'unknown' })).toEqual({
      countries: countries,
    });
  });
});
