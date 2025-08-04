import {axiosInstanse} from "./axios.api.service";
import { apiUrls } from '../costants/Urls';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import { IAncestorDateModel } from '../models/IAncestorDateModel';

export const AncestorDatesApiService = {
    allDates: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IAncestorDateModel>> => {
        try {
        const {data} = await axiosInstanse.get<IPaginationModel<IAncestorDateModel>>(apiUrls.ancestors.getAllAncestorsDates,
          {params: {
              page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
            } catch (error: any) {
            console.error('load All AncestorDates failed:', error?.response?.data || error);
                throw error
            }
    },
    getAncestorDateById: async (ancestorDateId: string): Promise<IAncestorDateModel> => {
        try {
            const {data} = await axiosInstanse.get<IAncestorDateModel>(apiUrls.ancestors.getAncestorDateById(ancestorDateId))
            return data
                } catch (error: any) {
            console.error('load ancedstorDate failed:', error?.response?.data || error);
            throw error
                }

}
}