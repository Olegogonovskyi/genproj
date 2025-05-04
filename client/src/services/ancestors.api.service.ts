import {axiosInstanse} from "./axios.api.service";
import { ancestors } from '../costants/Urls';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import { IAncestorModel } from '../models/IAncestorModel';

export const AncestorsApiService = {
    allAncestors: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IAncestorModel>> => {
        try {
        const {data} = await axiosInstanse.get<IPaginationModel<IAncestorModel>>(ancestors.allancestors,
          {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
            } catch (error: any) {
            console.error('load All Ancestors failed:', error?.response?.data || error);
                throw error
            }
    },
    getAncestorById: async (ancestorId: string): Promise<IAncestorModel> => {
        try {
            const {data} = await axiosInstanse.get<IAncestorModel>(ancestors.ancestorById(ancestorId))
            return data
                } catch (error: any) {
            console.error('load one Ancestor failed:', error?.response?.data || error);
            throw error
                }
}
}