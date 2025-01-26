import { EventsEntity } from '../../database/entities/events.entity';

export type FamilyType = {
  insideId: string;
  _UID?: string;
  _UPD?: string;
  HUSB?: string;
  WIFE?: string;
  CHIL?: object;
  EVENTS?: EventsEntity[];
};
