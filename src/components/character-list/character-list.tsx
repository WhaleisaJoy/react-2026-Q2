import type { Character } from '../../types/character';
import { CharacterCard } from '../character-card/character-card';
import './character-list.scss';

interface Props {
  characters: Character[];
}

export function CharacterList({ characters }: Props) {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
