import { configureStore } from "@reduxjs/toolkit";
import heroes from './slices/heroSlices';
import episodes from './slices/episodeSlices';

export const store = configureStore({
  reducer: {
    heroes: heroes,
    episodes: episodes,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;