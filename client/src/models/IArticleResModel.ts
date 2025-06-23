import { IUserModel } from './IUserModel';
import { IArticleBodyModel } from './IArticleBodyModel';

export interface IArticleResModel {
  id: string,
  description: string,
  body: IArticleBodyModel[],
  image: string[];
  tags: string[];
  title: string;
  user: IUserModel
}