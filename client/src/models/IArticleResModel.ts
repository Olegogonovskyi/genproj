import { IUserModel } from './IUserModel';

export interface IArticleResModel {
  id: string,
  description: string,
  body: string,
  image: string[];
  tags: string[];
  title: string;
  user: IUserModel
}