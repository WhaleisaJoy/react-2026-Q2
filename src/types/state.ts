import type { Character } from './character';

export type SelectedCharactersByIdState = Record<number, Character>;

export interface CharactersState {
  selectedCharactersById: SelectedCharactersByIdState;
}
