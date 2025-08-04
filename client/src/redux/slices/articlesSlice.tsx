import {createAsyncThunk, createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { IArticleResModel } from '../../models/IArticleResModel';
import { articlesApiService } from '../../services/articles.api.service';
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../helpers/matchers';
import { RejectedAction } from '../../models/types/IRejectedActionType';
import { ILoadType } from '../../models/types/ILoadType';

type initialStateProps = IPaginationModel<IArticleResModel> & ILoadType
const initialState: initialStateProps = {
  page: 1,
  data: [],
  total: 0,
  limit: 10,
  offset: 0,
  tag: '',
  search: '',
  loading: false,
  error: null,
  isLoaded: false
}

const searchArticleLoad = createAsyncThunk(
    'articlesSlice/searchArticleLoad',
    async ({qwerty: {search, offset, limit, tag}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await articlesApiService.searchArticles({qwerty: {search, offset, limit, tag}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const ArticleByIdLoad = createAsyncThunk(
  'articlesSlice/ArticleByIdLoad',
  async (articleId: string, thunkAPI) => {
    try {
      const response = await articlesApiService.getArticleById(articleId) // url get from const {query} = useParams()
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

      .addCase(ArticleByIdLoad.fulfilled, (state, action: PayloadAction<IArticleResModel>) => {
        state.data = [action.payload]
      })
      .addMatcher(isFulfilled(searchArticleLoad), (state, action) => {
        return {...state, ...action.payload};
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action: RejectedAction) => {
        state.loading = false;
        state.error = action.error?.message || 'Request failed';
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.loading = false;
      }),
})

const {reducer: articlesReducer, actions} = articlesSlice

const articlesActions = {
    ...actions,
    searchArticleLoad,
  ArticleByIdLoad
}

export {articlesActions, articlesReducer}