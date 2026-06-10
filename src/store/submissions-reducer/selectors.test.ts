import { countries } from '../../const/countries.const';
import type { Submission } from '../../types/submission';
import type { RootState } from '../store';
import { getNewSubmissionId, getSubmissions } from './selectors';

const submission: Submission = {
  id: '1',
  name: 'John',
  age: '25',
  email: 'john@test.com',
  gender: 'male',
  country: 'Canada',
  password: 'Password123',
  confirmPassword: 'Password123',
  terms: true,
  imageBase64: 'base64-image',
};

const state: RootState = {
  submissions: {
    submissions: [submission],
    newSubmissionId: '1',
  },
  countries: {
    countries: countries,
  },
};

describe('Selectors', () => {
  it('get submissions', () => {
    expect(getSubmissions(state)).toEqual([submission]);
  });

  it('get New Submission Id', () => {
    expect(getNewSubmissionId(state)).toEqual('1');
  });
});
