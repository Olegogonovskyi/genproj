import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DatesEntity } from '../../../database/entities/dates.entity';

@Injectable()
export class DateRepository extends Repository<DatesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DatesEntity, dataSource.manager);
  }
}
