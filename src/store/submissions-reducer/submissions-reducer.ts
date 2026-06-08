import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SubmissionsState } from '../../types/state';
import type { Submission } from '../../types/submission';

const initialState: SubmissionsState = {
  submissions: [],
  newSubmissionId: null,
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.submissions.unshift(action.payload);
      state.newSubmissionId = action.payload.id;
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export const submissionsReducer = submissionsSlice.reducer;
