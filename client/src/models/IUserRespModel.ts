import { IUserModel } from './IUserModel';
import { ITokenPairModel } from './ITokenPairModel';

export interface IUserRespModel { // auth/google/callback
  user: IUserModel,
  tokens: ITokenPairModel
}