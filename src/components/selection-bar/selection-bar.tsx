import './selection-bar.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedCharacters, getSelectedCharactersCount } from '../../store/characters-reducer/selectors';
import { Button } from '../shared/button/button';
import { clearSelectedCharacters } from '../../store/characters-reducer/characters-reducer';
import { useTranslations } from 'next-intl';

export function SelectionBar() {
  const t = useTranslations('selectionBar');
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(getSelectedCharacters);
  const selectedCharactersCount = useAppSelector(getSelectedCharactersCount);

  if (selectedCharactersCount === 0) return null;

  const handleUnselectAll = () => {
    dispatch(clearSelectedCharacters());
  };

  return (
    <div className="selection-bar">
      <div className="selection-bar__info">
        <span className="selection-bar__icon"></span>
        <span>{t('selected', { count: selectedCharactersCount })}</span>
      </div>

      <div className="selection-bar__actions">
        <Button onClick={handleUnselectAll}>{t('unselectAll')}</Button>

        <form action="/api/export/characters" method="post">
          {selectedCharacters.map((character) => (
            <input key={character.id} type="hidden" name="ids" value={character.id} />
          ))}
          <Button type="submit">{t('download')}</Button>
        </form>
      </div>
    </div>
  );
}
