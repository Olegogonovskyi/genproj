import {axiosInstanse} from "./axios.api.service";
import { apiUrls, baseUrls } from '../costants/Urls';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import { IDateCreateModel } from '../models/iDateCreateModel';
import { IDateModel } from '../models/iDateModel';

export const ChronologyApiService = {
    allDates: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IDateModel>> => {
        try {
        const {data} = await axiosInstanse.get<IPaginationModel<IDateModel>>(baseUrls.chronology,
          {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
            } catch (error: any) {
            console.error('load All Dates failed:', error?.response?.data || error);
                throw error
            }
    },
    getDateById: async (dateId: string): Promise<IDateModel> => {
        try {
            const {data} = await axiosInstanse.get<IDateModel>(apiUrls.chronology.getById(dateId))
            return data
                } catch (error: any) {
            console.error('load date failed:', error?.response?.data || error);
            throw error
                }

},
    createDates: async (datesToPost: IDateCreateModel[]) => {
        const { data } = await axiosInstanse.post<IDateModel[]>(apiUrls.chronology.create, datesToPost, {
            headers: {
                'Content-Type': 'application/json', // Явно вказуємо Content-Type
            },
        })
        return data;
    },
    updateDateById: async (dateId: string, formData: IDateCreateModel): Promise<IDateModel> => {
        try {
            const {data} = await axiosInstanse.patch<IDateModel>(apiUrls.chronology.updateById(dateId), formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return data
        } catch (error: any) {
            console.error('update date failed:', error?.response?.data || error);
            throw error
        }

    },
    deleteDate: async (dateId: string) => {
        try {
                   return await axiosInstanse.delete(apiUrls.chronology.updateById(dateId))
                } catch (error: any) {
            console.error('delete date failed:', error?.response?.data || error);
            throw error
                }
    }
}