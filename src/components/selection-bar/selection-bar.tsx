import './selection-bar.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedCharacters, getSelectedCharactersCount } from '../../store/characters-reducer/selectors';
import { Button } from '../shared/button/button';
import { clearSelectedCharacters } from '../../store/characters-reducer/characters-reducer';
import { exportSelectedCharactersToCsv } from '../../utils/character-export.utils';

export function SelectionBar() {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(getSelectedCharacters);
  const selectedCharactersCount = useAppSelector(getSelectedCharactersCount);

  if (selectedCharactersCount === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clearSelectedCharacters());
  };

  const handleDownload = () => {
    exportSelectedCharactersToCsv(selectedCharacters);
  };

  return (
    <div className="selection-bar">
      <div className="selection-bar__info">
        <span className="selection-bar__icon"></span>
        <span>{selectedCharactersCount} items selected</span>
      </div>

      <div className="selection-bar__actions">
        <Button onClick={handleUnselectAll}>Unselect all</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}
