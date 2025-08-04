import {IArticleBlockBodyModel} from "./IArticleBlockBodyModel";

export interface IArticleUpdateModel {
  description?: string,
  body?: IArticleBlockBodyModel[],
  tags?: string;
  title?: string;
  articleImage?: string[]
}