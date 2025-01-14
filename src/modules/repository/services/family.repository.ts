import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FamilyEntity } from '../../../database/entities/family.entity';

@Injectable()
export class FamilyRepository extends Repository<FamilyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FamilyEntity, dataSource.manager);
  }
}
