import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SubmissionsState } from '../../types/state';
import type { Submission } from '../../types/submission';

const initialState: SubmissionsState = {
  submissions: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export const submissionsReducer = submissionsSlice.reducer;
