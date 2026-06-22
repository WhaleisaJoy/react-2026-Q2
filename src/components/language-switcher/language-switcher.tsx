import './language-switcher.scss';
import { useState, useTransition } from 'react';
import { useLocale, useTranslations, type Locale } from 'next-intl';
import { routing } from '../../i18n/routing';
import { usePathname, useRouter } from '../../i18n/navigation';
import { Button } from '../shared/button/button';

export function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    setIsOpen(false);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="language-switcher" aria-label={t('label')}>
      <Button
        className="language-switcher__trigger"
        aria-label={t('triggerLabel')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleTriggerClick}
      >
        <span>文</span>
        <span>{t(locale)}</span>
      </Button>

      {isOpen && (
        <div className="language-switcher__dropdown" role="listbox" aria-label={t('label')}>
          {routing.locales.map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={item === locale}
              disabled={isPending || item === locale}
              className={`language-switcher__dropdown-option ${
                item === locale ? 'language-switcher__dropdown-option--active' : ''
              }`}
              onClick={() => handleLocaleChange(item)}
            >
              {t(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
