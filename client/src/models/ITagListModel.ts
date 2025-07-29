import {ITagModel} from "./ITagModel";

export interface ITagListModel {
    data: ITagModel[],
    name: string,
    articles: []
}