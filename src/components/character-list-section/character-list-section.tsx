'use client';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleCharacterSelection } from '../../store/characters-reducer/characters-reducer';
import { getSelectedCharacterIds } from '../../store/characters-reducer/selectors';
import type { Character } from '../../types/character';
import { CharacterCard } from '../character-card/character-card';
import { CharacterList } from '../character-list/character-list';

interface Props {
  characters: Character[];
  selectedCharacterId: number | null;
  searchValue: string;
  currentPage: number;
}
export function CharacterListSection({ characters, selectedCharacterId, searchValue, currentPage }: Props) {
  const t = useTranslations('characterListSection');
  const dispatch = useAppDispatch();

  const selectedCharactersId = useAppSelector(getSelectedCharacterIds);

  const onSelectionToggle = (character: Character) => {
    dispatch(toggleCharacterSelection(character));
  };

  if (characters.length === 0) {
    return <p className="app__no-results">{t('noResults')}</p>;
  }

  return (
    <CharacterList>
      {characters.map((character, index) => (
        <div key={character.id} className="character-list__item">
          <CharacterCard
            character={character}
            isCardSelected={character.id === selectedCharacterId}
            isCheckboxSelected={selectedCharactersId.includes(character.id)}
            isLcpImage={index < 3}
            searchValue={searchValue}
            currentPage={currentPage}
            onCheckboxToggle={onSelectionToggle}
          />
        </div>
      ))}
    </CharacterList>
  );
}
