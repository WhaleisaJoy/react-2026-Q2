import { createBrowserRouter } from 'react-router';
import App from '../App';
import { MainPage } from '../pages/main-page/main-page';
import { AboutPage } from '../pages/about-page/about-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { APP_ROUTES } from './routes';
import { CharacterDetails } from '../components/character-details/character-details';

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.MAIN.path,
    element: <App />,
    children: [
      {
        path: '',
        element: <MainPage />,
        children: [
          {
            index: true,
            element: <CharacterDetails />,
          },
        ],
      },
      {
        path: APP_ROUTES.ABOUT.path,
        element: <AboutPage />,
      },
      {
        path: APP_ROUTES.NOT_FOUND.path,
        element: <NotFoundPage />,
      },
    ],
  },
]);
