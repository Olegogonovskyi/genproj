import { IAncestorsDateModel } from './IAncestorsDateModel';

export interface IAncestorMiniModel {
  id: string,
  insideId: string,
  name: boolean,
  marriedSurName: string,
  surName: string,
  birthDateandPlace: IAncestorsDateModel,
  deathDateandPlace: IAncestorsDateModel
}