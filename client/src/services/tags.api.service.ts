import {axiosInstanse} from "./axios.api.service";
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import {apiUrls, baseUrls} from '../costants/Urls';
import {ITagModel} from "../models/ITagModel";

export const tagsApiService = {
    loadAllTags: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<ITagModel>> => {
       try {
           const {data} = await axiosInstanse.get<IPaginationModel<ITagModel>>(baseUrls.tag,
               {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined}})
           return data
       } catch (error: any) {
           console.error('load all tags failed:', error?.response?.data || error);
           throw error
       }
    },
    updateById: async (tagId: string, name:  string): Promise<ITagModel> => {
        try {
            const {data} = await axiosInstanse.patch<ITagModel>(apiUrls.tag.getById(tagId), name)
            return data
        } catch (error: any) {
            console.error('update tag failed:', error?.response?.data || error);
            throw error
        }
    },
    deleteTag: async (tagId: string): Promise<void> => {
        try {
            await axiosInstanse.delete(apiUrls.tag.getById(tagId))
                } catch (error: any) {
            console.error('delete tag failed:', error?.response?.data || error);
            throw error
                }
    }
}