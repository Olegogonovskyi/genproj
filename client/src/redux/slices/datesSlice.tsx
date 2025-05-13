import {createAsyncThunk, createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';
import { IDateModel } from '../../models/iDateModel';
import { ChronologyApiService } from '../../services/chronology.api.service';

type initialStateProps = IPaginationModel<IDateModel>
const initialState: initialStateProps = {
  page: 1,
  data: [],
  total: 0,
  limit: 10,
  offset: 0,
  tag: '',
  search: '',
}

const AllDatesLoad = createAsyncThunk(
    'datesSlice/AllDatesLoad',
    async ({qwerty: {search, offset, limit, tag}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await ChronologyApiService.allDates({qwerty: {search, offset, limit, tag}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const DateByIdLoad = createAsyncThunk(
  'datesSlice/DateByIdLoad',
  async (dateId: string, thunkAPI) => {
    try {
      const response = await ChronologyApiService.getDateById(dateId) // url get from const {query} = useParams()
      return thunkAPI.fulfillWithValue(response)
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const datesSlice = createSlice({
    name: 'ancestorsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

      .addCase(DateByIdLoad.fulfilled, (state, action: PayloadAction<IDateModel>) => {
        state.data = [action.payload]
      })
      .addMatcher(isFulfilled(AllDatesLoad), (state, action) => {
        return {...state, ...action.payload};
      })



})

const {reducer: datesReducer, actions} = datesSlice

const datesActions = {
    ...actions,
  AllDatesLoad,
  DateByIdLoad,

}

export {datesActions, datesReducer}