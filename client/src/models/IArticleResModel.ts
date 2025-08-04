import { IUserModel } from './IUserModel';
import {IArticleBlockBodyModel} from "./IArticleBlockBodyModel";

export interface IArticleResModel {
  id: string,
  description: string,
  body: IArticleBlockBodyModel[],
  image: string[];
  tags: string[];
  title: string;
  user: IUserModel
}