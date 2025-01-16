import { individualType } from './Individual.Type';

export type FamilyType = {
  id?: string;
  uid?: string;
  updated?: string;
  parents?: individualType[];
  children: individualType[];
  date: object;
};
