import {axiosInstanse} from "./axios.api.service";
import { articleUrls, baseUrls, chronologyUrls } from '../costants/Urls';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import { IDateCreateModel } from '../models/iDateCreateModel';

export const ChronologyApiService = {
    allDates: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IDateCreateModel>> => {
        try {
        const {data} = await axiosInstanse.get<IPaginationModel<IDateCreateModel>>(baseUrls.baseChronology,
          {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
            } catch (error: any) {
            console.error('load All Dates failed:', error?.response?.data || error);
                throw error
            }
    },
    getDateById: async (dateId: string): Promise<IDateCreateModel> => {
        try {
            const {data} = await axiosInstanse.get<IDateCreateModel>(chronologyUrls.getById(dateId))
            return data
                } catch (error: any) {
            console.error('load date failed:', error?.response?.data || error);
            throw error
                }

},
    createDates: async (dateToPost: IDateCreateModel) => {
        const { data } = await axiosInstanse.post<IDateCreateModel>(chronologyUrls.createDate, dateToPost)
        return data;
    },
    updateDateById: async (dateId: string): Promise<IDateCreateModel> => {
        try {
            const {data} = await axiosInstanse.patch<IDateCreateModel>(chronologyUrls.getById(dateId))
            return data
        } catch (error: any) {
            console.error('update date failed:', error?.response?.data || error);
            throw error
        }

    },
}