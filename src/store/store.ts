import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countries-reducer/countries-reducer';
import { submissionsReducer } from './submissions-reducer/submissions-reducer';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    submissions: submissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
