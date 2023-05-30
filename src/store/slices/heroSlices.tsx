import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface IArrayHeroes {
  id: number;
  name: string;
  status: string;
  species?: string;
  image?: string;
}

export interface IPageInfo {
  count: number;
  pages: number;
}

interface ApiResponse {
  results: IArrayHeroes[];
  info: IPageInfo;
}

export interface IFetchState {
  listOfChar: IArrayHeroes[];
  pageInfo: IPageInfo | null;
  hero: IArrayHeroes | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IFetchState = {
  listOfChar: [],
  pageInfo: null,
  hero: null,
  isLoading: false,
  error: null,
} as IFetchState;

export const fetchCharacter = createAsyncThunk(
  "heroes/fetchCharacter",
  async (url: string) => {
    try {
      const res: AxiosResponse = await axios(url);
      const heroes = await res.data;
      await new Promise((r) => setTimeout(r, 1000));
      return heroes;
    } catch (error) {}
  }
);

export const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCharacter.fulfilled,
      (state, action: PayloadAction<ApiResponse>) => {
        state.isLoading = false;
        state.listOfChar = action.payload.results;
        state.pageInfo = action.payload.info;
      }
    );
    builder.addCase(
      fetchCharacter.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default heroSlice.reducer;
