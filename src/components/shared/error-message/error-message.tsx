import type { PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  title?: string;
  message: string;
}

export function ErrorMessage({ title, message, children }: PropsWithChildren<Props>) {
  const t = useTranslations('errorMessage');

  return (
    <div className="app-error" role="alert">
      <h3 className="app-error__title">{title ?? t('defaultTitle')}</h3>
      <p>{message}</p>
      {children}
    </div>
  );
}
