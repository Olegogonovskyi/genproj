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
  monthIndex: string;
};

export const months: mounthType[] = [
  { monthName: 'JAN', monthIndex: '01' },
  { monthName: 'FEB', monthIndex: '02' },
  { monthName: 'MAR', monthIndex: '03' },
  { monthName: 'APR', monthIndex: '04' },
  { monthName: 'MAY', monthIndex: '05' },
  { monthName: 'JUN', monthIndex: '06' },
  { monthName: 'JUL', monthIndex: '07' },
  { monthName: 'AUG', monthIndex: '08' },
  { monthName: 'SEP', monthIndex: '09' },
  { monthName: 'OCT', monthIndex: '10' },
  { monthName: 'NOV', monthIndex: '11' },
  { monthName: 'DEC', monthIndex: '12' },
];
