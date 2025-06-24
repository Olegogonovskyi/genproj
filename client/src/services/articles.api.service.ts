import {axiosInstanse} from "./axios.api.service";
import { IArticleResModel } from '../models/IArticleResModel';
import { ISearchServiceType } from '../models/ISearchServiceType';
import { IPaginationModel } from "../models/IPaginationModel";
import { apiUrls } from '../costants/Urls';

export const articlesApiService = {
    searchArticles: async ({page, qwerty: {search, offset, limit, tag}}: ISearchServiceType): Promise<IPaginationModel<IArticleResModel>> => {
        const {data} = await axiosInstanse.get<IPaginationModel<IArticleResModel>>(apiUrls.article.getAll,
          {params: {page: page, limit: limit || undefined, offset: offset || undefined, search: search || undefined, tag: tag || undefined}})
        return data
    },
    getArticleById: async (articleId: string): Promise<IArticleResModel> => {
        const {data} = await axiosInstanse.get<IArticleResModel>(apiUrls.article.getById(articleId))
        return data
},
    createArticle: async (createdArticle: FormData): Promise<IArticleResModel> => {
        const { data } = await axiosInstanse.post<IArticleResModel>(apiUrls.article.getAll, createdArticle, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    updateById: async (articleId: string, formArticleData:  FormData): Promise<IArticleResModel> => {
        try {
            const {data} = await axiosInstanse.patch<IArticleResModel>(apiUrls.article.getById(articleId), formArticleData)
            return data
        } catch (error: any) {
            console.error('update article failed:', error?.response?.data || error);
            throw error
        }
    },
    deleteArticle: async (articleId: string): Promise<void> => {
        try {
            await axiosInstanse.delete(apiUrls.article.getById(articleId))
                } catch (error: any) {
            console.error('delete article failed:', error?.response?.data || error);
            throw error
                }
    }
}