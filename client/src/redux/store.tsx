import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {themeReducer} from "./slices/themeSlice";
import { articlesReducer } from './slices/articlesSlice';
import { ancestorsReducer } from './slices/ancestorsSlice';
import { datesReducer } from './slices/datesSlice';
import { usersReducer } from './slices/usersSlice';
import { ancestorsDateReducer } from "./slices/ancestorsDateSlice";

export const store = configureStore({
    reducer: {
        ancestorsReducer,
        articlesReducer,
        themeReducer,
        datesReducer,
        usersReducer,
        ancestorsDateReducer
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>();

export {useAppDispatch, useAppSelector}