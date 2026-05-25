import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { SelectedCharactersByIdState } from '../../types/state';

export const getSelectedCharactersById = (state: RootState): SelectedCharactersByIdState =>
  state.characters.selectedCharactersById;

export const getSelectedCharacters = createSelector([getSelectedCharactersById], (selectedCharactersById) =>
  Object.values(selectedCharactersById)
);

export const getSelectedCharacterIds = createSelector([getSelectedCharactersById], (selectedCharactersById) =>
  Object.keys(selectedCharactersById).map(Number)
);

export const getSelectedCharactersCount = (state: RootState): number =>
  Object.keys(state.characters.selectedCharactersById).length;
