import {createAsyncThunk, createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { ISearchServiceType } from '../../models/ISearchServiceType';
import { IPaginationModel } from '../../models/IPaginationModel';
import { ILoadType } from '../../models/types/ILoadType';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../helpers/matchers';
import { RejectedAction } from '../../models/types/IRejectedActionType';
import { IUserModel } from '../../models/IUserModel';
import { usersApiService } from '../../services/users.api.service';

type initialStateProps = IPaginationModel<IUserModel> & ILoadType
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

const AllUsersLoad = createAsyncThunk(
    'usersSlice/AllUsersLoad',
    async ({qwerty: {search, offset, limit, tag}, page}: ISearchServiceType, thunkAPI) => {
        try {
            const response = await usersApiService.getAll({qwerty: {search, offset, limit, tag}, page}) // url get from const {query} = useParams()
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

const UserByIdLoad = createAsyncThunk(
  'usersSlice/UserByIdLoad',
  async (usersId: string, thunkAPI) => {
    try {
      const response = await usersApiService.getUserById(usersId) // url get from const {query} = useParams()
      return thunkAPI.fulfillWithValue(response)
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder

      .addCase(UserByIdLoad.fulfilled, (state, action: PayloadAction<IUserModel>) => {
        state.data = [action.payload]
      })
      .addMatcher(isFulfilled(AllUsersLoad), (state, action) => {
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

const {reducer: usersReducer, actions} = usersSlice

const ancestorsActions = {
    ...actions,
  AllUsersLoad,
  UserByIdLoad,

}

export {ancestorsActions, usersReducer}