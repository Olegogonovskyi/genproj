export const fieldsLevelOne = [
  '_UPD', // +
  'SEX', // +
  '_UID', // +
  'NOTE', // +
  'HUSB', // fam
  'WIFE',
  'CHIL', // fam
];

export const exeptionFieldsLevelOne = [
  'NAME', // person +
  'OBJE', // person +
];

export const fieldsLeveltwo = [
  'GIVN', // +
  'SURN', // +
  '_MARNM', // +
  'DATE', // birt + deat
  'NPFX', // +
  'PLAC', // birt + deat
  'FILE', // +
];

export const fieldsDate = [
  'BIRT', // person - date // +
  'DEAT', // person - date
  'MARR', // fam - date
  'DEAT',
];

export const familyArrFields = [
  'FAMS', // +
  'FAMC', // +
];
