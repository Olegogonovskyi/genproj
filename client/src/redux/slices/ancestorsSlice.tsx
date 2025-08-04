import {createAsyncThunk, createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';
import { IAncestorModel } from '../../models/IAncestorModel';
import { AncestorsApiService } from '../../services/ancestors.api.service';
import { ILoadType } from '../../models/types/ILoadType';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../helpers/matchers';
import { RejectedAction } from '../../models/types/IRejectedActionType';

type initialStateProps = IPaginationModel<IAncestorModel> & ILoadType
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

const AllAncestorsLoad = createAsyncThunk(
    'ancestorsSlice/AllAncestorsLoad',
    async ({qwerty: {search, offset, limit, tag}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await AncestorsApiService.allAncestors({qwerty: {search, offset, limit, tag}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const AncestorByIdLoad = createAsyncThunk(
  'ancestorsSlice/AncestorByIdLoad',
  async (ancestorId: string, thunkAPI) => {
    try {
      const response = await AncestorsApiService.getAncestorById(ancestorId) // url get from const {query} = useParams()
      return thunkAPI.fulfillWithValue(response)
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const ancestorsSlice = createSlice({
    name: 'ancestorsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

      .addCase(AncestorByIdLoad.fulfilled, (state, action: PayloadAction<IAncestorModel>) => {
        state.data = [action.payload]
      })
      .addMatcher(isFulfilled(AllAncestorsLoad), (state, action) => {
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

const {reducer: ancestorsReducer, actions} = ancestorsSlice

const ancestorsActions = {
    ...actions,
  AllAncestorsLoad,
  AncestorByIdLoad,

}

export {ancestorsActions, ancestorsReducer}