import type { Submission } from '../../types/submission';
import { submissionsReducer, addSubmission } from './submissions-reducer';

describe('SubmissionsReducer', () => {
  it('returns initial state', () => {
    expect(submissionsReducer(undefined, { type: 'unknown' })).toEqual({
      submissions: [],
      newSubmissionId: null,
    });
  });

  it('adds submission and sets newSubmissionId', () => {
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

    const state = submissionsReducer(
      {
        submissions: [],
        newSubmissionId: null,
      },
      addSubmission(submission)
    );

    expect(state.submissions).toEqual([submission]);
    expect(state.newSubmissionId).toBe('1');
  });

  it('creates addSubmission action', () => {
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

    expect(addSubmission(submission)).toEqual({
      type: 'submissions/addSubmission',
      payload: submission,
    });
  });
});
