import './about-page.scss';
import { useTranslations } from 'next-intl';

export function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <div className="about-page">
      <h1 className="about-page__title">{t('title')}</h1>
      <p>{t('description')}</p>
      <div className="about-page__sections-wrapper">
        <div className="about-page__section">
          <h3 className="about-page__section-title">{t('authorTitle')}</h3>
          <p className="about-page__section-description">{t('authorDescription')}</p>
          <a
            className="about-page__section-link"
            href="https://github.com/whaleisajoy"
            target="_blank"
            rel="noreferrer"
          >
            Github: WhaleisaJoy
          </a>
        </div>

        <div className="about-page__section">
          <h3 className="about-page__section-title">{t('mentorTitle')}</h3>
          <p className="about-page__section-description">{t('mentorDescription')}</p>
          <a className="about-page__section-link" href="https://github.com/aleks6699" target="_blank" rel="noreferrer">
            Github: aleks6699
          </a>
        </div>
      </div>

      <div className="about-page__section">
        <h3 className="about-page__section-title">{t('courseTitle')}</h3>
        <p className="about-page__section-description">{t('courseDescription')}</p>
        <a
          className="about-page__section-link"
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          {t('courseLink')} rs.school/courses/reactjs
        </a>
      </div>
    </div>
  );
}
