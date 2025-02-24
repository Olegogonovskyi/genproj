export const fieldsLevelOne = [
  '_UPD', // +
  'SEX', // +
  '_UID', // +
  'HUSB', // fam
  'WIFE',
  'CHIL', // fam
  'NOTE', // +
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


type mounthType = {
  monthName: string;
  monthIndex: number;
};

export const months: mounthType[] = [
  { monthName: 'JAN', monthIndex: 0 },
  { monthName: 'FEB', monthIndex: 1 },
  { monthName: 'MAR', monthIndex: 2 },
  { monthName: 'APR', monthIndex: 3 },
  { monthName: 'MAY', monthIndex: 4 },
  { monthName: 'JUN', monthIndex: 5 },
  { monthName: 'JUL', monthIndex: 6 },
  { monthName: 'AUG', monthIndex: 7 },
  { monthName: 'SEP', monthIndex: 8 },
  { monthName: 'OCT', monthIndex: 9 },
  { monthName: 'NOV', monthIndex: 10 },
  { monthName: 'DEC', monthIndex: 11 },
];
