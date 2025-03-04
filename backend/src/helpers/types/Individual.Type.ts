import { EventsType } from './eventsType';

export type individualType = {
  uid?: string;
  updated?: string;
  name?: string;
  sex?: string;
  isdead?: boolean;
  npfx?: string;
  note?: string;
  object?: string;
  dates?: EventsType[];
  familyAsParent?: string[];
  familyAsChild?: string[];
};
