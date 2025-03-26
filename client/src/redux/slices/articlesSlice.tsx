import {createAsyncThunk, createSlice, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { IArticleReqModel } from '../../models/IArticleReqModel';
import { articlesApiService } from '../../services/articles.api.service';
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';

type initialStateProps = IPaginationModel<IArticleReqModel>
const initialState: initialStateProps = {
  page: 0,
  data: [],
  total: 0,
  limit: 0,
  offset: 0,
  tag: '',
  search: ''
}

const searchArticleLoad = createAsyncThunk(
    'articlesSlice/searchArticleLoad',
    async ({query: {query}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await articlesApiService.searchArticles({query: {query}, page})
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const loadAllArticles = createAsyncThunk(
    'articlesSlice/loadAllArticles',
    async (arg: string, thunkAPI) => {
        try {
            const response = await articlesApiService.getAllArticles(arg)
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const articlesSlice = createSlice({
    name: 'articlesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

        .addMatcher(isFulfilled(loadAllArticles), (state, action) => {
            return {...state, ...action.payload};
        })

})

const {reducer: moviesReducer, actions} = articlesSlice

const articlesActions = {
    ...actions,
  loadAllArticles,
  searchArticleLoad,
}

export {articlesActions, moviesReducer}