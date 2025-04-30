import { IUserModel } from './IUserModel';

export interface IArticleReqModel {
  id: string,
  description: string,
  body: string,
  image: File[];
  tags: string[];
  title: string;
  user: IUserModel
}