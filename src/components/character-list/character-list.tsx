import type { Character } from '../../types/character';
import { CharacterCard } from '../character-card/character-card';
import './character-list.scss';

interface Props {
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
}

export function CharacterList({ characters, selectedCharacterId, onSelectCharacter }: Props) {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isSelected={character.id === selectedCharacterId}
          onSelect={onSelectCharacter}
        />
      ))}
    </div>
  );
}
