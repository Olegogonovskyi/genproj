import {axiosInstanse} from "./axios.api.service";
import { articleUrls } from '../costants/Urls';
import {IPaginationModel} from "../Models/IPaginationModel";
import { IArticleReqModel } from '../models/IArticleReqModel';

export const articlesApiService = {
    getAllArticles: async (page: string): Promise<IPaginationModel<IArticleReqModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleReqModel>>(articleUrls.getAllArticles, {params: {page: page}})
        return data
    },

    getAllArticles: async (page: string): Promise<IPaginationModel<IArticleReqModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleReqModel>>(articleUrls.getAllArticles, {params: {page: page}})
        return data
    }
}