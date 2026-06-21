import '../index.scss';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Providers } from './providers';
import { Header } from '../components/header/header';

export const metadata: Metadata = {
  title: 'RickVerse Search',
  description: 'Rick and Morty characters search app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app">
            <Header />

            <main className="app-main">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
