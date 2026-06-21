import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleCharacterSelection } from '../../store/characters-reducer/characters-reducer';
import { getSelectedCharacterIds } from '../../store/characters-reducer/selectors';
import type { Character } from '../../types/character';
import { CharacterCard } from '../character-card/character-card';
import { CharacterList } from '../character-list/character-list';
import { ErrorMessage } from '../shared/error-message/error-message';
import { Loader } from '../shared/loader/loader';

interface Props {
  isLoading: boolean;
  error: string | null;
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
}
export function CharacterListSection({ isLoading, error, characters, selectedCharacterId, onSelectCharacter }: Props) {
  const dispatch = useAppDispatch();

  const selectedCharactersId = useAppSelector(getSelectedCharacterIds);

  const onSelectionToggle = (character: Character) => {
    dispatch(toggleCharacterSelection(character));
  };

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (characters.length === 0) {
    return <p className="app__no-results">No characters found</p>;
  }

  return (
    <CharacterList>
      {characters.map((character, index) => (
        <div key={character.id} className="character-list__item">
          <CharacterCard
            character={character}
            isCardSelected={character.id === selectedCharacterId}
            isCheckboxSelected={selectedCharactersId.includes(character.id)}
            isLcpImage={index < 3}
            onCardSelect={onSelectCharacter}
            onCheckboxToggle={onSelectionToggle}
          />
        </div>
      ))}
    </CharacterList>
  );
}
