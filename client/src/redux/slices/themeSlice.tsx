import {createSlice} from "@reduxjs/toolkit";

type ThemeSlice = {
    curentTheme: boolean
}

const initialState: ThemeSlice = {
    curentTheme: true // Light
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.curentTheme = !state.curentTheme
        }
    }
})

const {reducer: themeReducer, actions} = themeSlice

const themeActions = {
    ...actions
}

export {themeActions, themeReducer}