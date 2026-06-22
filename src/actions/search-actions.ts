'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from '../i18n/navigation';
import { buildSearchUrl } from '../utils/url-params.utils';

export async function searchCharacters(formData: FormData) {
  const locale = await getLocale();
  const searchValue = String(formData.get('search') ?? '').trim();

  redirect({
    href: buildSearchUrl({
      searchValue,
      page: 1,
    }),
    locale,
  });
}
