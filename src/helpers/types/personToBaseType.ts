import { EventsEntity } from '../../database/entities/events.entity';


export type PersonToBaseType = {
  insideId: string;
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
  EVENTS?: EventsEntity[]; // BIRT DEAT
};
