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
  refresh: async () => {
    try {
      const refreshToken = LocalStorHelper<ITokenObtainPair>(tokenKey).refresh
      const response = await axiosInstanse.post(authUrls.refresh, {refresh: refreshToken})
      if (response.data) {
         localStorage.setItem(tokenKey, JSON.stringify(response.data))
      }
    } catch (error) {
      console.error('refresh failed:', error);
      throw error;
    }
  },

  register: async (userData: IRegLogPair): Promise<IUserModel> => {
    try {
      const response = await axiosInstanse.post<IUserRespModel>(authUrls.register, userData);
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
      const response = await axiosInstanse.get<IUserRespModel>(authUrls.googleLogin);

      if (response.data.tokens) {
        localStorage.setItem(tokenKey, JSON.stringify(response.data.tokens));
      }
      localStorage.setItem(userKey, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  }
}

export {
  authService
}