import type { RootState } from '../store';

export const getSelectedIds = (state: RootState): number[] => state.characters.selectedIds;
