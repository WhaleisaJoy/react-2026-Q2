import type { Character } from '../../types/character';
import './character-card.scss';

interface Props {
  character: Character;
  isSelected?: boolean;
  onSelect: (id: number) => void;
}

export function CharacterCard({ character, isSelected, onSelect }: Props) {
  const handleClick = () => {
    onSelect(character.id);
  };

  return (
    <article className={`character-card ${isSelected ? 'character-card--selected' : ''}`}>
      <button className="character-card__button" type="button" onClick={handleClick}>
        <figure className="character-card__image-wrapper">
          <img className="character-card__image" src={character.image} alt={character.name} loading="lazy" />
        </figure>

        <div className="character-card__content">
          <header className="character-card__header">
            <h2 className="character-card__name">{character.name}</h2>
            <span className={`character-card__status character-card__status--${character.status.toLowerCase()}`}>
              <span className="character-card__status-dot"></span>
              {character.status}
            </span>
          </header>

          <ul className="character-card__detail-list">
            <li className="character-card__detail-item">
              <p className="character-card__detail-title">Species</p>
              <p className="character-card__detail-value">{character.species}</p>
            </li>

            <li className="character-card__detail-item">
              <p className="character-card__detail-title">Gender</p>
              <p className="character-card__detail-value">{character.gender}</p>
            </li>
          </ul>
        </div>
      </button>
    </article>
  );
}
