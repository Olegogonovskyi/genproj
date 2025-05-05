import axios from "axios";
import { authUrls, baseUrl } from '../costants/Urls';
import { tokenKey } from '../costants/keysToLockalStorage';
import { authService } from './auth.service';
import { LocalStorHelper } from '../helpers/localStorHelper';
import { ITokenPairModel } from '../models/ITokenPairModel';

export const axiosInstanse = axios.create({
    baseURL: baseUrl,
})

axiosInstanse.interceptors.request.use(request => {
    const accessToken = LocalStorHelper<ITokenPairModel>(tokenKey).accessToken
  if (accessToken) {
    request.headers.set('Authorization', 'Bearer ' + accessToken);
  }
    return request
})

axiosInstanse.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const refreshToken = LocalStorHelper<ITokenPairModel>(tokenKey).refreshToken;
    const isRefreshEndpoint = originalRequest?.url?.includes(authUrls.refresh);
    console.log(originalRequest?.url)
    console.log(isRefreshEndpoint)

    // Якщо токен не оновився, і ми вже пробували — або якщо це refresh — виходимо
    if (error.response?.status === 401) {
      if (isRefreshEndpoint) {
        localStorage.removeItem(tokenKey)
        window.location.href = authUrls.login; // або useNavigate('/login') у компоненті
        return Promise.reject(error);
      }

      if (!originalRequest._retry && refreshToken) {
        originalRequest._retry = true;

        try {
          const { tokens } = await authService.refresh();
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
          return axiosInstanse(originalRequest);
        } catch (err) {
          await authService.logout();
          window.location.href = authUrls.login; // редірект
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);