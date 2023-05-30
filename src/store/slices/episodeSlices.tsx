import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface IArrayEpisodes {
  id: number;
  name: string;
  status?: string;
  species?: string;
  air_date: number;
}

export interface IPageInfo {
  count: number;
  pages: number;
}

export interface IFetchState {
  listOfEpisode: IArrayEpisodes[];
  pageInfo: IPageInfo | null;
  isLoading: boolean;
  error: string | null;
}

interface ApiResponse {
  results: IArrayEpisodes[];
  info: IPageInfo;
}

const initialState: IFetchState = {
  listOfEpisode: [],
  pageInfo: null,
  isLoading: false,
  error: null,
} as IFetchState;

export const fetchEpisode = createAsyncThunk(
  "episodes/fetchEpisode",
  async (url: string) => {
    const res: AxiosResponse = await axios(url);
    const episodes = await res.data;
    await new Promise((r) => setTimeout(r, 1000));
    return episodes;
  }
);

export const episodeSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisode.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchEpisode.fulfilled,
      (state, action: PayloadAction<ApiResponse>) => {
        state.isLoading = false;
        state.listOfEpisode = action.payload.results;
        state.pageInfo = action.payload.info;
      }
    );
    builder.addCase(
      fetchEpisode.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.error.message;
      }
    );
  },
});

export default episodeSlice.reducer;
