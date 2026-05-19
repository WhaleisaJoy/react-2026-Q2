import type { Character } from '../../types/character';
import { CharacterCard } from '../character-card/character-card';
import { CharacterList } from '../character-list/character-list';
import { Loader } from '../shared/loader/loader';

interface Props {
  isLoading: boolean;
  error: string | null;
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
}
export function CharacterListSection({ isLoading, error, characters, selectedCharacterId, onSelectCharacter }: Props) {
  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="app-error" role="alert">
        <h3 className="app-error__title">Oops!</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return <p className="app__no-results">No characters found</p>;
  }

  return (
    <CharacterList>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isSelected={character.id === selectedCharacterId}
          onSelect={onSelectCharacter}
        />
      ))}
    </CharacterList>
  );
}
