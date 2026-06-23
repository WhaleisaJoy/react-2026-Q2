'use client';

import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/theme-provider';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
