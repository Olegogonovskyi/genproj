import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovieDetailInfo} from "../../Models/IMovieDetailInfo";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";
import {IVideoModel} from "../../Models/IVideoModel";

type initialStateType = {
    movie: IMovieDetailInfo | null,
    video: IVideoModel | null
}

const initialState: initialStateType = {
    movie: null,
    video: null
}

const loadmovieVideo = createAsyncThunk(
    'detailMovieSlice/loadmovieVideo',
    async (arg: string, thunkAPI) => {
        try {
            const response = await moviesApiService.getVideos(arg)
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }

    }
)

const loadmovieDetails = createAsyncThunk(
    'detailMovieSlice/loadmovieDetails',
    async (arg: string, thunkAPI) => {
        try {
            const response = await moviesApiService.movieDetails(arg)
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }

    }
)

const detailMovieSlice = createSlice({
        name: 'detailMovieSlice',
        reducers: {},
        initialState,
        extraReducers: builder => builder
            .addCase(loadmovieDetails.fulfilled, (state, action: PayloadAction<IMovieDetailInfo>) => {
                state.movie = action.payload
            })
            .addCase(loadmovieVideo.fulfilled, (state, action: PayloadAction<IVideoModel>) => {
                state.video = action.payload
            })
    }
)

const {reducer: detailMovieReducer, actions} = detailMovieSlice

const detailMovieActions = {
    ...actions,
    loadmovieDetails,
    loadmovieVideo
}

export {detailMovieActions, detailMovieReducer}