import {IArticleResModel} from "./IArticleResModel";

export interface ITagModel {
    id: string,
    created: string,
    updated: string,
    articleCount: number,
    name: string,
    articles: IArticleResModel[]
}