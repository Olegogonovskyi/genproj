import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenreModel} from "../../Models/IGenreModel";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";

type IGenresType = { genres: IGenreModel[] }
const initialState: IGenresType = {
    genres: []
}

const loadGenres = createAsyncThunk(
    'genreSlice/loadGenres',
    async (arg: void, thunkAPI) => {
        try {
            const response = await moviesApiService.getGenres()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(loadGenres.fulfilled, (state, action: PayloadAction<IGenreModel[]>) => {
            return {...state, ...action.payload};
        })

})

const {reducer: genreReducer, actions} = genreSlice

const genreActions = {
    ...actions,
    loadGenres
}

export {genreActions, genreReducer}