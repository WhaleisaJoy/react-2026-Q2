import { type ChangeEvent, type SubmitEvent } from 'react';
import { Button } from '../shared/button/button';
import './search.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function Search({ value, onChange, onSubmit }: Props) {
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
        placeholder="Search for characters..."
        aria-label="Search characters"
        onChange={handleChange}
      />

      <Button type="submit">Search</Button>
    </form>
  );
}
