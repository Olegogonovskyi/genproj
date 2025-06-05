import { IAncestorFamilyModel } from './IAncestorFamilyModel';
import { IAncestorMiniModel } from './IAncestorMiniModel';

export interface IAncestorDateModel {
  id: string,
  type: string,
  date: string,
  place: string,
  familyPersons: IAncestorFamilyModel[],
  personEvent: IAncestorMiniModel[]
}