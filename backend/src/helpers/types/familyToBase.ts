import { EventsEntity } from '../../database/entities/events.entity';
import { PersonEntity } from '../../database/entities/person.entity';

export type FamilyToBase = {
  id?: string;
  insideId?: string;
  uid?: string;
  updated?: string;
  parents?: PersonEntity[];
  children?: PersonEntity[];
  events?: EventsEntity[];
};
