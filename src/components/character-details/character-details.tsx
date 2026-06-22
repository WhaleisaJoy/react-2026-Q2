import './character-details.scss';
import { useGetCharacterQuery } from '../../api/ramapi-service';
import { Loader } from '../shared/loader/loader';
import { ErrorMessage } from '../shared/error-message/error-message';
import { getDetailsErrorMessageKey } from '../../api/error-messages';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Props {
  selectedCharacterId: number;
  onClose: () => void;
}

export function CharacterDetails({ selectedCharacterId, onClose }: Props) {
  const t = useTranslations('characterDetails');
  const tApiErrors = useTranslations('apiErrors');
  const { data: character, isLoading, isFetching, error } = useGetCharacterQuery(selectedCharacterId);
  const errorMessage = error ? tApiErrors(getDetailsErrorMessageKey(error)) : null;

  return (
    <div className="character-details">
      <button className="character-details__close" type="button" onClick={onClose} aria-label={t('close')}>
        ×
      </button>

      {isLoading && <Loader />}

      {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}

      {!isLoading && character && (
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
      )}

      {isFetching && !isLoading && character && (
        <div className="character-details__refreshing">
          <Loader />
        </div>
      )}
    </div>
  );
}
