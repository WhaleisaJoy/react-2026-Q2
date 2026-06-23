'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '../components/shared/button/button';

export function RefreshButton() {
  const t = useTranslations('mainPage');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button onClick={handleRefresh} disabled={isPending}>
      {isPending ? t('refreshing') : t('refresh')}
    </Button>
  );
}
