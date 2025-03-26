import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {moviesReducer} from "./slices/articlesSlice";
import {detailMovieReducer} from "./slices/detailMovieSlice";
import {genreReducer} from "./slices/genreSlice";
import {themeReducer} from "./slices/themeSlice";

export const store = configureStore({
    reducer: {
        moviesReducer,
        detailMovieReducer,
        genreReducer,
        themeReducer
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>();

export {useAppDispatch, useAppSelector}