import {axiosInstanse} from "./axios.api.service";
import { articleUrls } from '../costants/Urls';
import { IArticleReqModel } from '../models/IArticleReqModel';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";

export const articlesApiService = {
    getAllArticles: async (page: string): Promise<IPaginationModel<IArticleReqModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleReqModel>>(articleUrls.getAllArticles, {params: {page: page}})
        return data
    },

    searchArticles: async ({page, query: {query}  }: ISearchServiceType): Promise<IPaginationModel<IArticleReqModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleReqModel>>(articleUrls.searchArticle(query), {params: {page: page, }})
        return data
    }
}