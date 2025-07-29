import {createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../helpers/matchers';
import { RejectedAction } from '../../models/types/IRejectedActionType';
import { ILoadType } from '../../models/types/ILoadType';
import {ITagModel} from "../../models/ITagModel";
import {tagsApiService} from "../../services/tags.api.service";

type initialStateProps = IPaginationModel<ITagModel> & ILoadType
const initialState: initialStateProps = {
  page: 1,
  data: [],
  total: 0,
  limit: 10,
  offset: 0,
  search: '',
  loading: false,
  error: null,
  isLoaded: false
}

const allTagsLoad = createAsyncThunk(
    'tagsSlice/allTagsLoad',
    async ({qwerty: {search, offset, limit}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await tagsApiService.loadAllTags({qwerty: {search, offset, limit}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const tagsSlice = createSlice({
    name: 'tagsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

      .addMatcher(isFulfilled(allTagsLoad), (state, action) => {
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

const {reducer: tagsReducer, actions} = tagsSlice

const tagsActions = {
    ...actions,
    allTagsLoad,
}

export {tagsActions, tagsReducer}