import {LocalStorHelper} from "../helpers/localStorHelper";
import { IRegLogPair } from '../models/IRegLogPair';
import { ITokenObtainPair } from '../models/ITokenObtainPair';
import { authUrls } from '../costants/Urls';
import { tokenKey, userKey } from '../costants/keysToLockalStorage';
import { axiosInstanse } from './axios.api.service';
import { IUserRespModel } from '../models/IUserRespModel';
import { IUserModel } from "../models/IUserModel";

const authService = {

  auth: async (formData: IRegLogPair): Promise<boolean> => {

    try {
      const response = await axiosInstanse.post<ITokenObtainPair>(authUrls.login, formData)
      if(response.data.access && response.data.refresh) {
        localStorage.setItem(tokenKey, JSON.stringify(response.data))
        return true;
      }
      return false;
            } catch (error) {
      console.error('auth failed:', error);
      throw error;
            }
  },
  refresh: async (): Promise<ITokenObtainPair> => {
    try {
      const refreshToken = LocalStorHelper<ITokenObtainPair>(tokenKey).refresh
      const { data } = await axiosInstanse.post<ITokenObtainPair>(authUrls.refresh, {refresh: refreshToken})
      if (data) {
         localStorage.setItem(tokenKey, JSON.stringify(data));
        return data
      }
      return {} as ITokenObtainPair;
    } catch (error) {
      console.error('refresh failed:', error);
      throw error
    }
  },

  register: async (userData: IRegLogPair): Promise<IUserModel> => {
    try {
      console.log('ddddd')
      const response = await axiosInstanse.post<IUserRespModel>(authUrls.register, userData);
      console.log('eeee')
      if (response.data.tokens) {
        localStorage.setItem(tokenKey, JSON.stringify(response.data.tokens));
      }
      localStorage.setItem(userKey, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Можна обробити помилку конкретніше
    }
  },

  googleLogin: async ():  Promise<IUserModel> => {
    try {
      const response = await axiosInstanse.get<IUserRespModel>(authUrls.googleCallback);
      const { user, tokens } = response.data;

      if (user && tokens) {
        localStorage.setItem(userKey, JSON.stringify(user));
        localStorage.setItem(tokenKey, JSON.stringify(tokens));
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