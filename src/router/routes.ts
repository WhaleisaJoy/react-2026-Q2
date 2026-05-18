export const APP_ROUTES = {
  MAIN: {
    path: '/',
    to: '/',
  },

  ABOUT: {
    path: 'about',
    to: '/about',
  },

  NOT_FOUND: {
    path: '*',
  },
} as const;
