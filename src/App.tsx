import { Outlet } from 'react-router';
import './App.scss';
import { Header } from './components/header/header';

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
