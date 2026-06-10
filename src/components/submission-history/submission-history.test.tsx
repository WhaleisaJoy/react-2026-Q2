import { render, screen } from '@testing-library/react';
import { SubmissionHistory } from './submission-history';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('SubmissionHistory', () => {
  it('should render', () => {
    render(
      <Provider store={store}>
        <SubmissionHistory />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Submission history/i })).toBeInTheDocument();
  });
});
