import {createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
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
  search: '',
  url: ''
}

const searchArticleLoad = createAsyncThunk(
    'articlesSlice/searchArticleLoad',
    async ({qwerty: {search, offset, limit}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await articlesApiService.searchArticles({qwerty: {search, offset, limit}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

// const loadAllArticles = createAsyncThunk(
//     'articlesSlice/loadAllArticles',
//     async (arg: string, thunkAPI) => {
//         try {
//             const response = await articlesApiService.getAllArticles(arg)
//             return thunkAPI.fulfillWithValue(response)
//         } catch (e) {
//             const error = e as AxiosError
//             return thunkAPI.rejectWithValue(error.response?.data)
//         }
//     }
// )

const articlesSlice = createSlice({
    name: 'articlesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

        .addMatcher(isFulfilled(searchArticleLoad), (state, action) => {
            return {...state, ...action.payload};
        })

})

const {reducer: articlesReducer, actions} = articlesSlice

const articlesActions = {
    ...actions,
    searchArticleLoad,
}

export {articlesActions, articlesReducer}