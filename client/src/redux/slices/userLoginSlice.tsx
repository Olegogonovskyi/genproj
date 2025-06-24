import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../helpers/matchers';
import { RejectedAction } from '../../models/types/IRejectedActionType';
import { IUserModel } from '../../models/IUserModel';
import { ILoadType } from '../../models/types/ILoadType';
import { IRegLogPair } from '../../models/IRegLogPair';
import { authService } from '../../services/auth.service';
import { AxiosError } from 'axios';
import { IUserRespModel } from '../../models/IUserRespModel';

const initialState: IUserRespModel & ILoadType = {
  user: {
    name: '',
    deviceId: '',
    authMethod: '',
    isVerified: false,
    email: '',
    role: 'reader',
    id: ''
  },
  tokens: {
    accessToken: '',
    refreshToken: ''
  },
  loading: false,
  error: null,
  isLoaded: false
};

const UserAuth = createAsyncThunk<IUserRespModel, IRegLogPair>(
  'userLoginSlice/UserAuth',
  async (formData, thunkAPI) => {
    try {
      const response = await authService.auth(formData);
      return response; // ✅ Повертаємо об'єкт IUserRespModel
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const usersAuthSlice = createSlice({
  name: 'userLoginSlice',
  initialState,
  reducers: {
    logout: () => initialState // я хз, тестувати чи ок
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserAuth.fulfilled, (state, action: PayloadAction<IUserRespModel>) => {
        return {
          ...state,
          ...action.payload,
          loading: false,
          isLoaded: true,
          error: null
        };
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
      });
  }
});

const { reducer: usersAuthReducer, actions } = usersAuthSlice;

const usersAuthActions = {
  ...actions,
  UserAuth
};

export const { logout } = actions;
export { usersAuthActions, usersAuthReducer };
