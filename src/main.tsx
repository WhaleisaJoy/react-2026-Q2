import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from './router/router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
