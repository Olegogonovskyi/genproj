import {LocalStorHelper} from "../helpers/localStorHelper";
import { IRegLogPair } from '../models/IRegLogPair';
import { authUrls } from '../costants/Urls';
import { tokenKey } from '../costants/keysToLockalStorage';
import { axiosInstanse } from './axios.api.service';
import { IUserRespModel } from '../models/IUserRespModel';
import { IUserModel } from "../models/IUserModel";
import { ITokenPairModel } from '../models/ITokenPairModel';
import { LocalStorSetHelper } from '../helpers/localStorSetHelper';

const authService = {
  auth: async (formData: IRegLogPair): Promise<boolean> => {
    const {email, password, deviceId} = formData
    try {
      const {data} = await axiosInstanse.post<IUserRespModel>(authUrls.login, {email, password, deviceId})
      if(data.tokens && data.user) {
        LocalStorSetHelper(data)
        return true;
      }
      return false;
            } catch (error: any) {
      console.error('auth failed:', error?.response?.data || error);
      throw error;
            }
  },

  refresh: async (): Promise<IUserRespModel> => {
    try {
      const refreshToken = LocalStorHelper<ITokenPairModel>(tokenKey).refreshToken
      const { data } = await axiosInstanse.post<IUserRespModel>(authUrls.refresh, {refresh: refreshToken})
      if (data) {
        LocalStorSetHelper(data)
        return data
      }
      return {} as IUserRespModel;
    } catch (error: any) {
      console.error('refresh failed:', error?.response?.data || error);
      throw error
    }
  },

  register: async (userData: IRegLogPair): Promise<IUserModel> => {
    try {
      const {data} = await axiosInstanse.post<IUserRespModel>(authUrls.register, userData);
      if (data.tokens) {
        LocalStorSetHelper(data)
      }
      return data.user;
    } catch (error: any) {
      console.error('register failed:', error?.response?.data || error);
      throw error
    }
  },

  googleLogin: async ():  Promise<IUserModel> => {
    try {
      const response = await axiosInstanse.get<IUserRespModel>(authUrls.googleCallback);
      const { user, tokens } = response.data;

      if (user && tokens) {
        LocalStorSetHelper(response.data)
      }

      return response.data.user;
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstanse.post(authUrls.logout)
      localStorage.removeItem(tokenKey)
            } catch (error) {
          console.error("failed logout", error);
            }
  }

}

export {
  authService
}