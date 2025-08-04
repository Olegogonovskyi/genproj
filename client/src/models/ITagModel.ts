import {IArticleSimpleModel} from "./IArticleSimpleModel";

export interface ITagModel {
    id: string,
    articleCount: number,
    name: string,
    articles: IArticleSimpleModel[]
}