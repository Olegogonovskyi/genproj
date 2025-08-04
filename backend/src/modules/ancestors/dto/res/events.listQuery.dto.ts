import { EventsQueryDto } from '../req/eventsQuery.dto';
import { EventEntityResDto } from './eventEntity.res.dto';

export class EventsListQueryDto extends EventsQueryDto {
  data: EventEntityResDto[];
  total: number;
}
