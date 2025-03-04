import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EventsEntity } from '../../../database/entities/events.entity';

@Injectable()
export class EventRepository extends Repository<EventsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EventsEntity, dataSource.manager);
  }
}
