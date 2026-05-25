import './selection-bar.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedIdsCount } from '../../store/characters-reducer/selectors';
import { Button } from '../shared/button/button';
import { clearSelectedIds } from '../../store/characters-reducer/characters-reducer';

export function SelectionBar() {
  const dispatch = useAppDispatch();
  const selectedIdsCount = useAppSelector(getSelectedIdsCount);

  if (selectedIdsCount === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clearSelectedIds());
  };

  return (
    <div className="selection-bar">
      <div className="selection-bar__info">
        <span className="selection-bar__icon"></span>
        <span>{selectedIdsCount} items selected</span>
      </div>

      <div className="selection-bar__actions">
        <Button onClick={handleUnselectAll}>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
}
