'use client';

import { useState, type ChangeEvent } from 'react';
import { Button } from '../shared/button/button';
import './search.scss';
import { useTranslations } from 'next-intl';
import { searchCharacters } from '../../actions/search-actions';

interface Props {
  initialValue: string;
}

export function Search({ initialValue }: Props) {
  const t = useTranslations('search');

  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className="search" action={searchCharacters}>
      <input
        id="search"
        name="search"
        className="search__field"
        value={value}
        type="text"
        placeholder={t('placeholder')}
        aria-label={t('ariaLabel')}
        onChange={handleChange}
      />

      <Button type="submit">{t('submit')}</Button>
    </form>
  );
}
