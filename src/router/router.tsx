import { createBrowserRouter } from 'react-router';
import App from '../App';
import { MainPage } from '../pages/main-page/main-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);
