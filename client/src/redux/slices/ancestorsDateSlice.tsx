import {createAsyncThunk, createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';
import { ILoadType } from '../../models/types/ILoadType';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../helpers/matchers';
import { RejectedAction } from '../../models/types/IRejectedActionType';
import { IAncestorDateModel } from '../../models/IAncestorDateModel';
import { AncestorDatesApiService } from '../../services/ancestorDates.api.service';

type initialStateProps = IPaginationModel<IAncestorDateModel> & ILoadType
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

const AllAncestorsDatesLoad = createAsyncThunk(
    'ancestorsDatesSlice/AllAncestorsDatesLoad',
    async ({qwerty: {search, offset, limit, tag}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await AncestorDatesApiService.allDates({qwerty: {search, offset, limit, tag}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const AncestorDateByIdLoad = createAsyncThunk(
  'ancestorsDatesSlice/AncestorDateByIdLoad',
  async (ancestorId: string, thunkAPI) => {
    try {
      const response = await AncestorDatesApiService.getAncestorDateById(ancestorId) // url get from const {query} = useParams()
      return thunkAPI.fulfillWithValue(response)
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const ancestorsDateSlice = createSlice({
    name: 'ancestorsDatesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

      .addCase(AncestorDateByIdLoad.fulfilled, (state, action: PayloadAction<IAncestorDateModel>) => {
        state.data = [action.payload]
      })
      .addMatcher(isFulfilled(AllAncestorsDatesLoad), (state, action) => {
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

const {reducer: ancestorsDateReducer, actions} = ancestorsDateSlice

const ancestorsDateActions = {
    ...actions,
  AllAncestorsDatesLoad,
  AncestorDateByIdLoad,

}

export {ancestorsDateActions, ancestorsDateReducer}