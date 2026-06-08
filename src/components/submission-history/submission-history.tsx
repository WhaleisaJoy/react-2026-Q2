import './submission-history.scss';
import { useAppSelector } from '../../store/hooks';
import { getNewSubmissionId, getSubmissions } from '../../store/submissions-reducer/selectors';
import { SubmissionCard } from '../submission-card/submission-card';

export function SubmissionHistory() {
  const submissions = useAppSelector(getSubmissions);
  const newSubmissionId = useAppSelector(getNewSubmissionId);

  return (
    <section className="submission-history">
      <h2 className="submission-history__title">Submission history</h2>

      <div className="submission-list">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} isNew={submission.id === newSubmissionId} />
        ))}
      </div>
    </section>
  );
}
