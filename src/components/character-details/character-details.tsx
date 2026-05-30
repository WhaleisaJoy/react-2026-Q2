import './character-details.scss';
import { useOutletContext } from 'react-router';
import { getCharacter } from '../../api/ramapi-service';
import { useEffect, useState } from 'react';
import type { Character } from '../../types/character';
import { Loader } from '../shared/loader/loader';
import { isAbortError } from '../../utils/errors.utils';
import { ErrorMessage } from '../shared/error-message/error-message';

interface Context {
  selectedCharacterId: number;
  onClose: () => void;
}

export function CharacterDetails() {
  const { selectedCharacterId, onClose } = useOutletContext<Context>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const loadDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCharacter(selectedCharacterId, abortController.signal);

        setCharacter(data);
      } catch (error) {
        if (isAbortError(error)) {
          return;
        }

        setCharacter(null);
        setError(error instanceof Error ? error.message : 'Something went wrong while loading details.');
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      abortController.abort();
    };
  }, [selectedCharacterId]);

  return (
    <div className="character-details">
      <button className="character-details__close" type="button" onClick={onClose} aria-label="Close details">
        ×
      </button>

      {isLoading && <Loader />}

      {!isLoading && error && <ErrorMessage message={error} />}

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
    </div>
  );
}
