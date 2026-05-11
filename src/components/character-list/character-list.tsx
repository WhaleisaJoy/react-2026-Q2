import { Component } from 'react';
import type { Character } from '../../types/character';
import { CharacterCard } from '../character-card/character-card';
import './character-list.scss';

interface CharacterListProps {
  characters: Character[];
}

export class CharacterList extends Component<CharacterListProps> {
  render() {
    return (
      <div className="character-list">
        {this.props.characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
