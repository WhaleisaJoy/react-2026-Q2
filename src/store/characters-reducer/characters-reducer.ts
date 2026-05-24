import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharactersState } from '../../types/state';

const initialState: CharactersState = {
  selectedIds: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    toggleCharacterSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const isSelected = state.selectedIds.includes(id);

      if (isSelected) {
        state.selectedIds = state.selectedIds.filter((selectedId) => selectedId !== id);
        return;
      }

      state.selectedIds.push(id);
    },
  },
});

export const { toggleCharacterSelection } = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
