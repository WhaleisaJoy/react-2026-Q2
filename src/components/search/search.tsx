import { type ChangeEvent, type SubmitEvent } from 'react';
import { Button } from '../shared/button/button';
import './search.scss';
import { useTranslations } from 'next-intl';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function Search({ value, onChange, onSubmit }: Props) {
  const t = useTranslations('search');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
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
