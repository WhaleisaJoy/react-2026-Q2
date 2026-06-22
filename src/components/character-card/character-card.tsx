import Image from 'next/image';
import type { Character } from '../../types/character';
import './character-card.scss';
import type { MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { buildSearchUrl } from '../../utils/url-params.utils';

interface Props {
  character: Character;
  isCardSelected?: boolean;
  isCheckboxSelected: boolean;
  isLcpImage?: boolean;
  searchValue: string;
  currentPage: number;
  onCheckboxToggle: (character: Character) => void;
}

export function CharacterCard({
  character,
  isCardSelected,
  isCheckboxSelected,
  isLcpImage,
  searchValue,
  currentPage,
  onCheckboxToggle,
}: Props) {
  const t = useTranslations('characterCard');

  const detailsHref = buildSearchUrl({
    searchValue,
    page: currentPage,
    details: character.id,
  });

  const handleCheckboxClick = (evt: MouseEvent<HTMLInputElement>) => {
    evt.stopPropagation();
  };

  const handleCheckboxChange = () => {
    onCheckboxToggle(character);
  };

  return (
    <article className={`character-card ${isCardSelected ? 'character-card--selected' : ''}`}>
      <Link className="character-card__link" href={detailsHref} aria-label={t('openDetails', { name: character.name })}>
        <div className="character-card__body">
          <figure className="character-card__image-wrapper">
            <Image
              className="character-card__image"
              src={character.image}
              alt={character.name}
              width={120}
              height={120}
              fetchPriority={isLcpImage ? 'high' : 'auto'}
              loading={isLcpImage ? 'eager' : 'lazy'}
            />
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
                <p className="character-card__detail-title">{t('species')}</p>
                <p className="character-card__detail-value">{character.species}</p>
              </li>

              <li className="character-card__detail-item">
                <p className="character-card__detail-title">{t('gender')}</p>
                <p className="character-card__detail-value">{character.gender}</p>
              </li>
            </ul>
          </div>
        </div>
      </Link>

      <label className="visually-hidden" htmlFor={`character-checkbox-${character.id}`}>
        {t('select', { name: character.name })}
      </label>
      <input
        id={`character-checkbox-${character.id}`}
        className="character-card__checkbox"
        type="checkbox"
        checked={isCheckboxSelected}
        onClick={handleCheckboxClick}
        onChange={handleCheckboxChange}
      />
    </article>
  );
}
