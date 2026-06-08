import type { Submission } from '../../types/submission';
import type { RootState } from '../store';

export const getSubmissions = (state: RootState): Submission[] => state.submissions.submissions;
export const getNewSubmissionId = (state: RootState) => state.submissions.newSubmissionId;
