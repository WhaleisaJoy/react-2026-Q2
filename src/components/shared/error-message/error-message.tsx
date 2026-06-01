import type { PropsWithChildren } from 'react';

interface Props {
  title?: string;
  message: string;
}

export function ErrorMessage({ title = 'Oops!', message, children }: PropsWithChildren<Props>) {
  return (
    <div className="app-error" role="alert">
      <h3 className="app-error__title">{title}</h3>
      <p>{message}</p>
      {children}
    </div>
  );
}
