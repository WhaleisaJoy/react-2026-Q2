import './character-details.scss';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { fetchCharacterById } from '../../api/ramapi-server';
import { Link } from '../../i18n/navigation';

interface Props {
  selectedCharacterId: number;
  closeHref: string;
}

export async function CharacterDetails({ selectedCharacterId, closeHref }: Props) {
  const t = await getTranslations('characterDetails');
  const character = await fetchCharacterById(selectedCharacterId);

  return (
    <div className="character-details">
      <Link className="character-details__close" href={closeHref} aria-label={t('close')}>
        ×
      </Link>

      <div className="character-details__content">
        <figure className="character-details__image-wrapper">
          <Image
            className="character-details__image"
            src={character.image}
            alt={character.name}
            loading="eager"
            width={150}
            height={150}
            fetchPriority="high"
          />
        </figure>

        <h3 className="character-details__title">{character.name}</h3>

        <dl className="character-details__list">
          <div className="character-details__item">
            <dt>{t('status')}</dt>
            <dd>{character.status}</dd>
          </div>

          <div className="character-details__item">
            <dt>{t('species')}</dt>
            <dd>{character.species}</dd>
          </div>

          <div className="character-details__item">
            <dt>{t('gender')}</dt>
            <dd>{character.gender}</dd>
          </div>

          <div className="character-details__item">
            <dt>{t('origin')}</dt>
            <dd>{character.origin.name}</dd>
          </div>

          <div className="character-details__item">
            <dt>{t('location')}</dt>
            <dd>{character.location.name}</dd>
          </div>

          <div className="character-details__item">
            <dt>{t('episodes')}</dt>
            <dd>{character.episode.length}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
