import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    listOfChar: [],
    listOfEpisode: [],
    isLoading: false,
    error: null,
}

export const fetchCharacter = createAsyncThunk(
    'rickmorty/fetchCharacter',
    async (url) => {
        const res = await axios(url)
        const heroes = await res.data
        await new Promise(r => setTimeout(r, 1000));
        return heroes
    }
);

export const fetchEpisode = createAsyncThunk(
    'rickmorty/fetchEpisode',
    async (url) => {
        const res = await axios(url)
        const episodes = await res.data
        await new Promise(r => setTimeout(r, 1000));
        return episodes
    }
);

export const rickMortySlice = createSlice({
    name: "rickmorty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacter.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCharacter.fulfilled, (state, action) => {
            state.isLoading = false
            state.listOfChar = action.payload;
        })
        builder.addCase(fetchCharacter.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })


        builder.addCase(fetchEpisode.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchEpisode.fulfilled, (state, action) => {
            state.isLoading = false
            state.listOfEpisode = action.payload;
        })
        builder.addCase(fetchEpisode.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
});

export default rickMortySlice.reducer;



