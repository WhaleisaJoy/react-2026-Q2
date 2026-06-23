import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';
import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';

const messagesByLocale = {
  en: enMessages,
  ru: ruMessages,
};

type Locale = keyof typeof messagesByLocale;

interface RenderWithIntlOptions extends RenderOptions {
  locale?: Locale;
}

export function renderWithIntl(ui: ReactElement, options: RenderWithIntlOptions = {}) {
  const { locale = 'en', ...renderOptions } = options;

  return render(
    <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]}>
      {ui}
    </NextIntlClientProvider>,
    renderOptions
  );
}
