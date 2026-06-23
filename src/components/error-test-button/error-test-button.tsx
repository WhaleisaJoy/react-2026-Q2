'use client';

import { useState } from 'react';
import { Button } from '../shared/button/button';
import { useTranslations } from 'next-intl';

export function ErrorTestButton() {
  const t = useTranslations('errorTestButton');
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Test application error');
  }

  return (
    <Button className="button--error" onClick={handleClick}>
      {t('label')}
    </Button>
  );
}
