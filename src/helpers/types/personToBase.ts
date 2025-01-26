import { EventsEntity } from '../../database/entities/events.entity';
import { FamilyEntity } from '../../database/entities/family.entity';

export type PersonToBase = {
  id?: string;
  insideId?: string;
  uid?: string;
  updated?: string;
  name?: string;
  surName?: string;
  marriedSurName?: string;
  sex?: string;
  isDead?: boolean;
  npfx?: string;
  note?: string;
  object?: string;
  familyAsParent?: FamilyEntity[] | null;
  familyAsChild?: FamilyEntity[] | null;
  events?: EventsEntity[];
};
