import { configureStore } from "@reduxjs/toolkit";

import rickMortySlice from './slices/rickAndMorty';

export const store = configureStore({
  reducer: {
    rickmorty: rickMortySlice
  },
});