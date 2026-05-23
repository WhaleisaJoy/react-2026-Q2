import { Outlet } from 'react-router';
import './App.scss';
import { Header } from './components/header/header';
import { ThemeProvider } from './context/theme-provider';
import { ErrorBoundary } from './components/error-boundary/error-boundary';

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="app">
          <Header />

          <main className="app-main">
            <Outlet />
          </main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
