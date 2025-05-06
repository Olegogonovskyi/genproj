import {axiosInstanse} from "./axios.api.service";
import { articleUrls } from '../costants/Urls';
import { IArticleResModel } from '../models/IArticleResModel';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import { IArticleReqModel } from '../models/IArticleReqModel';

export const articlesApiService = {
    searchArticles: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IArticleResModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleResModel>>(articleUrls.getAllArticles,
          {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
    },
    getArticleById: async (articleId: string): Promise<IArticleResModel> => {
        const {data} = await axiosInstanse.get<IArticleResModel>(articleUrls.getArticleByID(articleId))
        return data
},
    createArticle: async (createdArticle: IArticleReqModel): Promise<IArticleResModel> => {
        const { data } = await axiosInstanse.post<IArticleResModel>(articleUrls.getAllArticles, createdArticle);
        return data;
    }
}