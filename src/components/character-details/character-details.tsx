import './character-details.scss';
import { useOutletContext } from 'react-router';
import { useGetCharacterQuery } from '../../api/ramapi-service';
import { Loader } from '../shared/loader/loader';
import { ErrorMessage } from '../shared/error-message/error-message';
import { getDetailsErrorMessage } from '../../api/error-messages';

interface Context {
  selectedCharacterId: number;
  onClose: () => void;
}

export function CharacterDetails() {
  const { selectedCharacterId, onClose } = useOutletContext<Context>();

  const { data: character, isLoading, isFetching, error } = useGetCharacterQuery(selectedCharacterId);
  const errorMessage = error ? getDetailsErrorMessage(error) : null;

  return (
    <div className="character-details">
      <button className="character-details__close" type="button" onClick={onClose} aria-label="Close details">
        ×
      </button>

      {isLoading && <Loader />}

      {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}

      {!isLoading && character && (
        <div className="character-details__content">
          <figure className="character-details__image-wrapper">
            <img
              className="character-details__image"
              src={character.image}
              alt={character.name}
              loading="lazy"
              width={150}
              height={150}
            />
          </figure>

          <h3 className="character-details__title">{character.name}</h3>

          <dl className="character-details__list">
            <div className="character-details__item">
              <dt>Status</dt>
              <dd>{character.status}</dd>
            </div>

            <div className="character-details__item">
              <dt>Species</dt>
              <dd>{character.species}</dd>
            </div>

            <div className="character-details__item">
              <dt>Gender</dt>
              <dd>{character.gender}</dd>
            </div>

            <div className="character-details__item">
              <dt>Origin</dt>
              <dd>{character.origin.name}</dd>
            </div>

            <div className="character-details__item">
              <dt>Location</dt>
              <dd>{character.location.name}</dd>
            </div>

            <div className="character-details__item">
              <dt>Episodes</dt>
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
