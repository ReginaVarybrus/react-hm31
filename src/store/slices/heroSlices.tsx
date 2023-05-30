import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface IArrayHeroes {
  id: number;
  name: string;
  status: string;
  species?: string;
  image?: string;
}

export interface IFetchState {
  listOfChar: IArrayHeroes[];
  pageInfo: IPageInfo | null;
  hero: IArrayHeroes | null;
  isLoading: boolean;
  error: string | null;
}

export interface IPageInfo {
  count: number;
  pages: number;
}

interface ApiResponse {
  results: IArrayHeroes[];
  info: IPageInfo;
  error: IError
}

// interface IError {
//     message?: string
//   }

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
    const res: AxiosResponse = await axios(url);
    const heroes = await res.data;
    await new Promise((r) => setTimeout(r, 1000));
    return heroes;
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
      (state, action: string | undefined) => {
        state.isLoading = false;
        console.log('error', action.error)
        state.error = action.error.message;
      }
    );
  },
});

export default heroSlice.reducer;
