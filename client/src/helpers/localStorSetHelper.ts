import { tokenKey, userKey } from '../costants/keysToLockalStorage';
import { IUserRespModel } from '../models/IUserRespModel';

export  const LocalStorSetHelper = (data: IUserRespModel) => {
  localStorage.setItem(tokenKey, JSON.stringify(data.tokens));
  localStorage.setItem(userKey, JSON.stringify(data.user));
}