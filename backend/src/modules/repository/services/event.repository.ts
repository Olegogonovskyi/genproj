import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EventsEntity } from '../../../database/entities/events.entity';
import { EventsQueryDto } from '../../ancestors/dto/req/eventsQuery.dto';

@Injectable()
export class EventRepository extends Repository<EventsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EventsEntity, dataSource.manager);
  }

  async getAll(query: EventsQueryDto): Promise<[EventsEntity[], number]> {
    const qb = this.createQueryBuilder('event');

    qb.leftJoinAndSelect('event.family', 'family');
    qb.leftJoinAndSelect('family.parents', 'familyParents');
    qb.leftJoinAndSelect('family.children', 'familyChildren');
    qb.leftJoinAndSelect('family.events', 'familyEvents');
    qb.leftJoinAndSelect('event.persons', 'persons');
    qb.leftJoinAndSelect('persons.events', 'personEvents');

    if (query.search) {
      qb.andWhere(
        `
      CONCAT_WS(' ', 
        event.type, 
        event.place, 
        event.date,
        persons.name,
        persons.surName,
        persons.marriedSurName,
        familyParents.name,
        familyParents.surName,
        familyParents.marriedSurName,
        familyChildren.name,
        familyChildren.surName,
        familyChildren.marriedSurName
      ) ILIKE :search
    `,
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('event.date', 'ASC', 'NULLS LAST');
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getOne(eventId: string): Promise<EventsEntity> {
    const qb = this.createQueryBuilder('event');

    qb.leftJoinAndSelect('event.family', 'family');
    qb.leftJoinAndSelect('family.parents', 'familyParents');
    qb.leftJoinAndSelect('family.children', 'familyChildren');
    qb.leftJoinAndSelect('family.events', 'familyEvents');
    qb.leftJoinAndSelect('event.persons', 'persons');
    qb.leftJoinAndSelect('persons.events', 'personEvents');

    qb.where('event.id = :id', { eventId });
    return await qb.getOne();
  }
}
