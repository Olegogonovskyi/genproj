import { IAncestorFamilyModel } from './IAncestorFamilyModel';

export interface IAncestorModel {
  id: string,
  insideId: string,
  name: string,
  surName: string,
  marriedSurName: string,
  sex: string,
  isDead: boolean,
  npfx: string,
  note: string,
  object: string,
  familyAsParent: IAncestorFamilyModel[],
  familyAsChild: IAncestorFamilyModel[],
}