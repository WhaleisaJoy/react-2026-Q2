import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('App', () => {
  it('should render child route through outlet', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<div>Test Main Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Main Page')).toBeInTheDocument();
  });
});
