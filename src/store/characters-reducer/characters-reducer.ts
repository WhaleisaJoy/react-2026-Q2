import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharactersState } from '../../types/state';
import type { Character } from '../../types/character';

const initialState: CharactersState = {
  selectedCharactersById: {},
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    toggleCharacterSelection: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const isSelected = Boolean(state.selectedCharactersById[character.id]);

      if (isSelected) {
        delete state.selectedCharactersById[character.id];
        return;
      }

      state.selectedCharactersById[character.id] = character;
    },

    clearSelectedCharacters: (state) => {
      state.selectedCharactersById = {};
    },
  },
});

export const { toggleCharacterSelection, clearSelectedCharacters } = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
