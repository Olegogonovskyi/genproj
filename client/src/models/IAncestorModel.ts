import { IAncestorFamilyModel } from './IAncestorFamilyModel';

export interface IAncestorModel {
  id: string,
  insideId: string,
  name: boolean,
  surName: string,
  marriedSurName: string,
  sex: string,
  isDead: string,
  npfx: string,
  note: string,
  object: string,
  familyAsParent: IAncestorFamilyModel[],
  familyAsChild: IAncestorFamilyModel[],
}