import axios from "axios";
import {baseUrl} from "../costants/Urls";
import { tokenKey } from '../costants/keysToLockalStorage';
import { authService } from './auth.service';

export const axiosInstanse = axios.create({
    baseURL: baseUrl,
})

axiosInstanse.interceptors.request.use(request => {
    const accessToken = localStorage.getItem(tokenKey)
  if (accessToken) {
    request.headers.set('Authorization', 'Bearer ' + accessToken);
  }
    return request
})

axiosInstanse.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem(tokenKey)
      ) {
          originalRequest._retry = true;

          try {
              const newTokens = await authService.refresh();
              originalRequest.headers.Authorization = `Bearer ${newTokens.tokens.accessToken}`;
              return axiosInstanse(originalRequest);
          } catch (error) {
              await  authService.logout();
              return Promise.reject(error);
          }
      }

      return Promise.reject(error);
  })