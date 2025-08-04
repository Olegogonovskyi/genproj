import { IAncestorsDateModel } from './IAncestorsDateModel';

export interface IAncestorMiniModel {
  id: string,
  insideId: string,
  name: string,
  marriedSurName: string,
  surName: string,
  birthDateandPlace: IAncestorsDateModel,
  deathDateandPlace: IAncestorsDateModel
}