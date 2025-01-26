import { EventsEntity } from '../../database/entities/events.entity';

export type Faaaaa = {
  id?: string;
  insideId?: string;
  uid?: string;
  updated?: string;
  parents?: string[];
  children?: string[];
  events?: EventsEntity[];
};
