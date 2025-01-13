export type individualType = {
  UID?: string;
  UPDATED?: string;
  NAME?: string;
  SEX?: string;
  BIRTH?: dateType;
  DEATH?: dateType;
  NOTE?: string;
  NPFX?: string;
  OBJECT?: objectType;
  MOTHER_UID?: string;
  FATHER_UID?: string;
  CHILDREN?: individualType[];
};

export type dateType = {
  DATE?: string;
  PLACE?: string;
};

export type objectType = {
  FILE?: string;
};
