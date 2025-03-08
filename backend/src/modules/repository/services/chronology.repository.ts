import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ChronologyEntity } from '../../../database/entities/chronology.entity';

@Injectable()
export class ChronologyRepository extends Repository<ChronologyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ChronologyEntity, dataSource.manager);
  }
}
