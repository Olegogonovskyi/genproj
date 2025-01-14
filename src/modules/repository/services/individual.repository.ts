import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IndividualEntity } from '../../../database/entities/individual.entity';

@Injectable()
export class IndividualRepository extends Repository<IndividualEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(IndividualEntity, dataSource.manager);
  }
}
