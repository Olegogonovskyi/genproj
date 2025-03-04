import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PersonEntity } from '../../../database/entities/person.entity';

@Injectable()
export class PersonRepository extends Repository<PersonEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PersonEntity, dataSource.manager);
  }
}
