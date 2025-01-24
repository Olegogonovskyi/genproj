export type PersonToBaseType = {
  _UID?: string; // +
  _UPD?: string; // +
  NPFX?: string; // NAME +
  GIVN?: string; // NAME +
  SURN?: string; // NAME +
  _MARNM?: string; // NAME +
  SEX?: string; // +
  DEAT?: string;
  NOTE?: string; // +
  OBJE?: string; // +
  FAMS?: string[]; // familyAsParent +
  FAMC?: string[]; // familyAsChild +
  DATES?: string[]; // BIRT DEAT
};
