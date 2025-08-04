import { IAncestorMiniModel } from './IAncestorMiniModel';
import { IAncestorsDateModel } from './IAncestorsDateModel';

export interface IAncestorFamilyModel {
  id: string,
  insideId: string,
  parents: IAncestorMiniModel[],
  children: IAncestorMiniModel[],
  dateOfMarry: IAncestorsDateModel,

}