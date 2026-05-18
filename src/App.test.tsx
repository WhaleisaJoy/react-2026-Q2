import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter, Route, Routes } from 'react-router';
import { APP_ROUTES } from './router/routes';

describe('App', () => {
  it('should render child route through outlet', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path={APP_ROUTES.MAIN.to} element={<App />}>
            <Route index element={<div>Test Main Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Main Page')).toBeInTheDocument();
  });
});
