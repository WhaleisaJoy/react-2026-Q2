import { render, screen } from '@testing-library/react';
import { SubmissionCard } from './submission-card';
import type { Submission } from '../../types/submission';

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

describe('SubmissionCard', () => {
  it('should render', () => {
    render(<SubmissionCard submission={submission} isNew={true} />);

    expect(screen.getByRole('heading', { name: submission.name })).toBeInTheDocument();
  });
});
