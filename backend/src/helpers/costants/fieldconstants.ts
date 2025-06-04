export const fieldsLevelOne = [
  '_UPD', // +
  'SEX', // +
  '_UID', // +
  'HUSB', // fam
  'WIFE',
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
];

export const familyArrFields = [
  'FAMS', // +
  'FAMC', // +
  'CHIL',
];

type mounthType = {
  monthName: string;
  monthIndex: number;
};

export const months: mounthType[] = [
  { monthName: 'JAN', monthIndex: 1 },
  { monthName: 'FEB', monthIndex: 2 },
  { monthName: 'MAR', monthIndex: 3 },
  { monthName: 'APR', monthIndex: 4 },
  { monthName: 'MAY', monthIndex: 5 },
  { monthName: 'JUN', monthIndex: 6 },
  { monthName: 'JUL', monthIndex: 7 },
  { monthName: 'AUG', monthIndex: 8 },
  { monthName: 'SEP', monthIndex: 9 },
  { monthName: 'OCT', monthIndex: 10 },
  { monthName: 'NOV', monthIndex: 11 },
  { monthName: 'DEC', monthIndex: 12 },
];
