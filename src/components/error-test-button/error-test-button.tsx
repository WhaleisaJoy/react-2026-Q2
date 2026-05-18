import { useState } from 'react';
import { Button } from '../shared/button/button';

export function ErrorTestButton() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Test application error');
  }

  return (
    <Button className="button--error" onClick={handleClick}>
      Throw error
    </Button>
  );
}
