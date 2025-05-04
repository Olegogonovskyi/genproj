import {axiosInstanse} from "./axios.api.service";
import { articleUrls } from '../costants/Urls';
import { IArticleReqModel } from '../models/IArticleReqModel';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";

export const articlesApiService = {
    searchArticles: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IArticleReqModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleReqModel>>(articleUrls.getAllArticles,
          {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
    },
    getArticleById: async (articleId: string): Promise<IArticleReqModel> => {
        const {data} = await axiosInstanse.get<IArticleReqModel>(articleUrls.getArticleByID(articleId))
        return data
}
}