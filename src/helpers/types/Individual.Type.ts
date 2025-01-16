import { DataType } from './data.Type';

export type individualType = {
  uid: string;
  updated?: string;
  name?: string;
  sex?: string;
  isdead: boolean;
  npfx?: string;
  note?: string;
  object?: string;
  dates?: DataType[];
  familyAsParent?: string[];
  familyAsChild?: string[];
};
