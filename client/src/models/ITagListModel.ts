import {ITagModel} from "./ITagModel";

export interface ITagListModel {
    data: ITagModel[],
    total: number,
    page: number,
    limit: number,
    offset: number,
    search: string
}