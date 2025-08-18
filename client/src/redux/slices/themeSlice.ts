import { createSlice } from "@reduxjs/toolkit";

const isSavedTheme = localStorage.getItem('theme') !== null

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: isSavedTheme ? localStorage.getItem('theme') : "default"
    },
    reducers: {
        toggleTheme(state, action) {
            state.theme = action.payload;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;