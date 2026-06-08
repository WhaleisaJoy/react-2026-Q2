import './submission-card.scss';
import type { Submission } from '../../types/submission';

interface Props {
  submission: Submission;
  isNew: boolean;
}

export function SubmissionCard({ submission, isNew }: Props) {
  return (
    <article className={`submission-card ${isNew ? 'submission-card--new' : ''}`}>
      <h2 className="submission-card__name">{submission.name}</h2>
      <figure className="submission-card__image-wrapper">
        <img className="submission-card__image" src={submission.imageBase64} alt={submission.name} loading="lazy" />
      </figure>
      <p>
        <span className="submission-card__label">Age:</span> {submission.age}
      </p>
      <p>
        <span className="submission-card__label">Email:</span> {submission.email}
      </p>
      <p>
        <span className="submission-card__label">Gender:</span> {submission.gender}
      </p>
      <p>
        <span className="submission-card__label">Country:</span> {submission.country}
      </p>
      <p>
        <span className="submission-card__label">Password:</span> {submission.password}
      </p>
      <p>
        <span className="submission-card__label">Terms & Conditions:</span>{' '}
        {submission.terms ? 'Accepted' : 'Not accepted'}
      </p>
    </article>
  );
}
