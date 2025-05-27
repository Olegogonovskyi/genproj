import { IUserModel } from '../models/IUserModel';
import { axiosInstanse } from './axios.api.service';
import { apiUrls, baseUrls } from '../costants/Urls';
import { IAdminCreateUserModel } from '../models/IAdminCreateUserModel';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from '../models/IPaginationModel';
import { IAdminUpdateUserModel } from '../models/IAdminUpdateUserModel';

export const usersApiService = {
  getMe: async (): Promise<IUserModel> => {
    try {
      const {data} = await axiosInstanse.get<IUserModel>(apiUrls.users.me)
      return data
            } catch (error: any) {
      console.error('getMe failed:', error?.response?.data || error);
      throw error;
            }
  },

  getUserById: async (userId: string): Promise<IUserModel> => {
    const {data} = await axiosInstanse.get<IUserModel>(apiUrls.users.userById(userId))
    return data
  },

  deleteUser: async (userId: string) => {
    await axiosInstanse.delete(apiUrls.users.userById(userId))
  },

  updateUser: async (userid: string, formData: IAdminUpdateUserModel): Promise<IUserModel> => {
    try {
               const {data} = await axiosInstanse.patch<IUserModel>(apiUrls.users.userById(userid), formData, {
                 headers: {
                   'Content-Type': 'application/json',
                 },}
               )
      return data
            } catch (error: any) {
      console.error('update date failed:', error?.response?.data || error);
      throw error
    }
  },

  removeMe: async (): Promise<void> => {
    try {
          await axiosInstanse.delete(apiUrls.users.me)
    } catch (error: any) {
      console.error('removeMe failed:', error?.response?.data || error);
      throw error;
    }
  },

  createByAdmin: async (userData: IAdminCreateUserModel): Promise<IUserModel> => {
    try {
      const {data} = await axiosInstanse.post<IUserModel>(apiUrls.users.create, userData)
      return data
            } catch (error: any) {
      console.error('createByAdmin failed:', error?.response?.data || error);
      throw error;
            }
  },
  getAll: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IUserModel>> => {
    try {
      const {data} = await axiosInstanse.get<IPaginationModel<IUserModel>>(baseUrls.adminUsers, {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
            return data
    } catch (error: any) {
      console.error('getAll failed:', error?.response?.data || error);
      throw error;
    }
  }
}

