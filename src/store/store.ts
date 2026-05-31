import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './characters-reducer/characters-reducer';
import { ramApi } from '../api/ramapi-service';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    [ramApi.reducerPath]: ramApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ramApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
