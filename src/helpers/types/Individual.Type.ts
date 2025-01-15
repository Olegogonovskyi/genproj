import { DataType } from './data.Type';

export type individualType = {
  uid: string;
  updated?: string;
  name?: string;
  sex?: string;
  npfx?: string;
  note?: string;
  object?: string;
  dates?: DataType[];
  familiesParent?: string[];
  familiesChildren?: string[];
};


