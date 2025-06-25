import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ChronologyEntity } from '../../../database/entities/chronology.entity';
import { ChronologyQueryDto } from '../../chronology/dto/req/chronologyQuery.dto';

@Injectable()
export class ChronologyRepository extends Repository<ChronologyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ChronologyEntity, dataSource.manager);
  }
  public async getList(
    query: ChronologyQueryDto,
  ): Promise<[ChronologyEntity[], number]> {
    const qb = this.createQueryBuilder('dates');
    if (query.search) {
      qb.andWhere('CONCAT(dates.year, dates.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    // Фільтр за yearStart
    if (query.yearStart !== undefined) {
      qb.andWhere('dates.year >= :yearStart', { yearStart: query.yearStart });
    }

    // Фільтр за yearEnd
    if (query.yearEnd !== undefined) {
      qb.andWhere('dates.year <= :yearEnd', { yearEnd: query.yearEnd });
    }

    // не забути посортувавати від меншого до біл!!
    qb.orderBy('dates.year', 'ASC');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async clearAll(): Promise<void> {
    await this.clear();
  }
}
