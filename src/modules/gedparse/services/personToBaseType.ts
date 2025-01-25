import { DatesEntity } from '../../../database/entities/dates.entity';

export type PersonToBaseType = {
  _UID?: string; // +
  _UPD?: string; // +
  NPFX?: string; // NAME +
  GIVN?: string; // NAME +
  SURN?: string; // NAME +
  _MARNM?: string; // NAME +
  SEX?: string; // +
  DEAT?: boolean;
  NOTE?: string; // +
  OBJE?: string; // +
  FAMS?: string[]; // familyAsParent +
  FAMC?: string[]; // familyAsChild +
  DATES?: DatesEntity[]; // BIRT DEAT
};
