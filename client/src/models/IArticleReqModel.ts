import { IArticleBlockBodyModel } from './IArticleBlockBodyModel';

export interface IArticleReqModel {
  description: string,
  body: IArticleBlockBodyModel[],
  tags?: string;
  title: string;
  articleImage : FileList | null
}