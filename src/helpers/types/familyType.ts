export type FamilyType = {
  uid: string;
  updated?: string;
  parents: string[];
  children: string[];
  date: string;
};


const Family = {
  uid: `44424`;
  parents: ['111', '222'];
  children: ['3333', '4444'];
};

const indone = {
  uid: `111`;
  familyParent: ['44424'];
  familychildren: []
};

const indtwo = {
  uid: `222`;
  familyParent: ['44424'];
  familychildren: []
};

const indthree = {
  uid: `3333`;
  familyParent: [];
  familychildren: ['44424']
};

const indfour = {
  uid: `4444`;
  familyParent: [];
  familychildren: ['44424']
};
