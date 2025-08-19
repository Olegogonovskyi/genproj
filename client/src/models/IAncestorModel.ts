import { IAncestorFamilyModel } from './IAncestorFamilyModel';
import { IAncestorsDateModel } from './IAncestorsDateModel';

export interface IAncestorModel {
  id: string,
  insideId: string,
  name: string,
  surName: string,
  marriedSurName: string,
  sex: string,
  isDead: boolean,
    worldSituation: string,
  npfx: string,
  note: string,
  object: string,
  familyAsParent: IAncestorFamilyModel[],
  familyAsChild: IAncestorFamilyModel[],
  birthDateandPlace: IAncestorsDateModel,
  deathDateandPlace: IAncestorsDateModel
}