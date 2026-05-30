import type { Character } from '../../types/character';
import './character-card.scss';
import type { KeyboardEvent, MouseEvent } from 'react';

interface Props {
  character: Character;
  isCardSelected?: boolean;
  isCheckboxSelected: boolean;
  onCardSelect: (id: number) => void;
  onCheckboxToggle: (character: Character) => void;
}

export function CharacterCard({
  character,
  isCardSelected,
  isCheckboxSelected,
  onCardSelect,
  onCheckboxToggle,
}: Props) {
  const handleCardClick = () => {
    onCardSelect(character.id);
  };

  const handleCardKeyDown = (evt: KeyboardEvent<HTMLElement>) => {
    if (evt.target !== evt.currentTarget) {
      return;
    }

    if (evt.key !== 'Enter' && evt.key !== ' ') {
      return;
    }

    evt.preventDefault();
    handleCardClick();
  };

  const handleCheckboxClick = (evt: MouseEvent<HTMLInputElement>) => {
    evt.stopPropagation();
  };

  const handleCheckboxChange = () => {
    onCheckboxToggle(character);
  };

  return (
    <article
      role="button"
      className={`character-card ${isCardSelected ? 'character-card--selected' : ''}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <label className="visually-hidden" htmlFor={`character-checkbox-${character.id}`}>
        {`Select ${character.name}`}
      </label>
      <input
        id={`character-checkbox-${character.id}`}
        className="character-card__checkbox"
        type="checkbox"
        checked={isCheckboxSelected}
        onClick={handleCheckboxClick}
        onChange={handleCheckboxChange}
      />

      <div className="character-card__body">
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
      </div>
    </article>
  );
}
